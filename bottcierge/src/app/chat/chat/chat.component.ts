// chat.component.ts

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';
import {
  Brand,
  Choice,
  MenuCategory,
  Message,
  OrderItem,
} from '../services/chat.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @ViewChild('chatContainer', { static: true }) chatContainer: ElementRef =
    new ElementRef(null);
  userMessage: string = '';
  typing = false;
  currentState: string = 'MAIN_MENU';
  selectedVIPPackage: string | null = null;
  customizationCount: number = 0;
  paradeMessage: string = '';

  constructor(public chatService: ChatService) {}

  ngOnInit() {
    this.sendWelcomeMessage();
  }

  sendWelcomeMessage() {
    this.chatService.addMessage({
      user: 'Bot',
      text: `Hi Welcome to "The Club", my name is Alana, it's my pleasure to serve you tonight. Thank you for using Bottcierge to easily place your drink and bottle service orders.`,
    });
    this.showMainMenu();
  }

  showMainMenu() {
    this.currentState = 'MAIN_MENU';
    this.chatService.addMessage({
      user: 'Bot',
      text: 'To begin placing your order please select one of the following options:',
      choices: this.chatService.mainMenu(false),
    });
  }

  handleUserChoice(choice: Choice) {
    console.log(choice);
    switch (choice.action) {
      case '*PLACE_ORDER*':
        this.showMenuCategories();
        break;
      case '*CALL_SERVICE*':
        this.callService();
        break;
      case '*CLOSE_ORDER*':
        this.closeOrder();
        break;
      case '*SELECT_CATEGORY*':
        this.showSpiritCategories(choice.id);
        break;
      case '*SELECT_BRAND*':
        this.showBrands(choice.id);
        break;
      case '*SELECT_BOTTLE*':
        // if (this.selectedVIPPackage) {
        //   this.addBottleToVIPPackage(choice);
        // } else {
        this.showBottles(choice.id);
        // }
        break;
      case '*ADD_ITEM*':
        if (this.selectedVIPPackage) {
          this.addBottleToVIPPackage(choice);
        } else {
          this.addItemToOrder(choice);
        }
        break;
      case '*SELECT_VIP_PACKAGE*':
        this.selectVIPPackage(choice.id);
        break;
      case '*ADD_ADDITIONAL_SERVICE*':
        this.addAdditionalService(choice.id);
        break;
      default:
        this.chatService.addMessage({
          user: 'Bot',
          text: "I'm sorry, I didn't understand that choice. Can you please try again?",
          choices: this.chatService.getMenuCategories(),
        });
    }
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTo(
        0,
        this.chatContainer.nativeElement.scrollHeight
      );
      this.typing = false;
    }, 200);
  }

  showMenuCategories() {
    this.currentState = 'MENU_CATEGORIES';
    this.chatService.addMessage({
      user: 'Bot',
      text: 'Please select one of the following menu categories:',
      choices: this.chatService.getMenuCategories(),
    });
  }

  private showCategoryNotAvailable(categoryType: string, itemName: string) {
    this.currentState = 'MENU_CATEGORIES';
    this.chatService.addMessage({
      user: 'Bot',
      text: `I apologize, but there are no ${categoryType} available for ${itemName}. Please choose another option:`,
      choices: this.chatService.getMenuCategories(),
    });
  }

  showSpiritCategories(menuCategoryId: string) {
    const spiritCategories =
      this.chatService.getSpiritCategories(menuCategoryId);

    if (spiritCategories.length === 0) {
      this.showCategoryNotAvailable('spirit categories', 'this menu category');
    } else {
      this.currentState = 'SPIRIT_CATEGORIES';
      this.chatService.addMessage({
        user: 'Bot',
        text: 'Please select one of the following spirit categories:',
        choices: spiritCategories,
      });
    }
  }

  showBrands(spiritCategory: string) {
    const brands = this.chatService.getBrands(spiritCategory);

    if (brands.length === 0) {
      this.showCategoryNotAvailable('brands', spiritCategory);
    } else {
      this.currentState = 'BRANDS';
      this.chatService.addMessage({
        user: 'Bot',
        text: `Please select one of the following ${spiritCategory} brands:`,
        choices: brands,
      });
    }
  }

  showBottles(brand: string) {
    const bottles = this.chatService.getBottles(brand);

    if (bottles.length === 0) {
      this.showCategoryNotAvailable('bottles', brand);
    } else {
      this.currentState = 'BOTTLES';
      this.chatService.addMessage({
        user: 'Bot',
        text: `Please select one of the following ${brand} bottles:`,
        choices: bottles,
      });
    }
  }

  addItemToOrder(bottle: Choice) {
    this.chatService.addItemToOrder({
      label: bottle.label,
      price: bottle.price,
      quantity: 1,
    } as OrderItem);
    this.chatService.addMessage({
      user: 'Bot',
      text: `Excellent choice! I've added ${
        bottle.label
      } to your order. Your current subtotal is $${this.chatService.currentOrder.subtotal.toFixed(
        2
      )}. Would you like to add anything else?`,
      choices: [
        {
          label: 'Yes, add more',
          action: '*PLACE_ORDER*',
          value: 'N/A',
          icon: 'add',
          show: true,
        },
        {
          label: 'No, finish order',
          action: '*FINISH_ORDER*',
          value: 'N/A',
          icon: 'check',
          show: true,
        },
      ],
    });
  }

  canIClick(index: number): boolean {
    return this.chatService.canIClick(index);
  }

  callService() {
    this.chatService.addMessage({
      user: 'User',
      text: 'Call Alana.',
    });

    this.chatService.addMessage({
      user: 'Bot',
      text: `Certainly! I've notified Alana, and she will be with you shortly. Is there anything else I can help you with in the meantime?`,
      choices: this.chatService.mainMenu(
        this.chatService.currentOrder.items.length > 0
      ),
    });
  }

  closeOrder() {
    if (this.chatService.currentOrder.items.length === 0) {
      this.chatService.addMessage({
        user: 'Bot',
        text: "I'm sorry, but you don't have any open orders to close. Would you like to place an order?",
        choices: this.chatService.mainMenu(false),
      });
      return;
    }

    const orderSummary = this.chatService.getOrderSummary();
    this.chatService.addMessage({
      user: 'Bot',
      text: "Certainly! I'll help you close your tab. Here's a summary of your order:",
    });

    this.chatService.addMessage({
      user: 'Bot',
      text: orderSummary,
    });

    this.chatService.addMessage({
      user: 'Bot',
      text: 'Are you ready to close your tab and make the payment?',
      choices: [
        {
          label: 'Yes, close tab',
          action: '*CONFIRM_CLOSE_TAB*',
          value: 'N/A',
          icon: 'check',
          show: true,
        },
        {
          label: 'No, keep tab open',
          action: '*KEEP_TAB_OPEN*',
          value: 'N/A',
          icon: 'clear',
          show: true,
        },
      ],
    });
  }

  confirmCloseTab() {
    this.initiatePayment();
  }

  keepTabOpen() {
    this.chatService.addMessage({
      user: 'Bot',
      text: 'No problem! Your tab will remain open. Is there anything else I can help you with?',
      choices: this.chatService.mainMenu(true),
    });
  }

  selectVIPPackage(packageId: string) {
    console.log(packageId);
    this.selectedVIPPackage = packageId;
    const vipPackage = this.chatService.vipPackages.find(
      (pkg) => pkg.id === packageId
    );
    console.log(vipPackage);
    if (vipPackage) {
      this.chatService.addMessage({
        user: 'Bot',
        text: `Great choice! You've selected the ${vipPackage.label}. Let's customize your package.`,
      });
      this.customizationCount = 0;
      this.customizeVIPPackage();
    }
  }

  customizeVIPPackage() {
    const vipPackage = this.chatService.vipPackages.find(
      (pkg) => pkg.id === this.selectedVIPPackage
    );

    if (vipPackage && this.customizationCount < vipPackage.customizableItems) {
      this.chatService.addMessage({
        user: 'Bot',
        text: `Please select your bottle #${this.customizationCount + 1}:`,
        choices: this.chatService.getSpiritCategories('*123*'),
      });
    } else {
      this.finishVIPPackage();
    }
  }

  addBottleToVIPPackage(bottle: Choice) {
    this.customizationCount++;
    this.chatService.addMessage({
      user: 'Bot',
      text: `Great! You've selected ${bottle.label} as bottle #${this.customizationCount}.`,
    });

    const vipPackage = this.chatService.vipPackages.find(
      (pkg) => pkg.id === this.selectedVIPPackage
    );
    this.chatService.addItemToOrder({
      label: bottle.label,
      price: bottle.price,
      quantity: 1,
      description: vipPackage?.label,
    } as OrderItem);
    if (vipPackage && this.customizationCount < vipPackage.customizableItems) {
      this.customizeVIPPackage();
    } else {
      this.finishVIPPackage();
    }
  }

  finishVIPPackage() {
    const vipPackage = this.chatService.vipPackages.find(
      (pkg) => pkg.id === this.selectedVIPPackage
    );
    if (vipPackage) {
      this.chatService.addItemToOrder({
        label: vipPackage.label,
        price: vipPackage.price,
        quantity: 1,
        description: vipPackage.description,
      } as OrderItem);

      this.chatService.addMessage({
        user: 'Bot',
        text: `Excellent! You've completed customizing your ${vipPackage.label}. I've added it to your order.`,
        //  Your current subtotal is $${this.chatService.currentOrder.subtotal.toFixed(        2        )}.
      });

      this.askForMoreItems();
    } else {
      this.chatService.addMessage({
        user: 'Bot',
        text: "I'm sorry, there was an error processing your VIP package. Please try again or select a different option.",
      });
      this.showMainMenu();
    }

    // Reset VIP package selection
    this.selectedVIPPackage = null;
    this.customizationCount = 0;
  }

  addAdditionalService(serviceId: string) {
    const service = this.chatService.additionalServices.find(
      (s) => s.id === serviceId
    );
    if (service) {
      if (service.id === 'make-it-a-parade') {
        this.initiateParadeMessage();
      } else {
        this.chatService.addItemToOrder({
          label: service.label,
          price: service.price,
          quantity: 1,
        } as OrderItem);
        this.askForMoreItems();
      }
    }
  }
  initiateParadeMessage() {
    this.currentState = 'PARADE_MESSAGE';
    this.chatService.addMessage({
      user: 'Bot',
      text: "Please type in and send your parade message. Please note it can't contain any special characters. Only letters and numbers. 20 characters max.",
    });
  }

  handleParadeMessage(message: string) {
    if (message.length > 20) {
      this.chatService.addMessage({
        user: 'Bot',
        text: 'Your message is too long. Please keep it to 20 characters or less.',
      });
    } else {
      this.paradeMessage = message;
      const paradeService = this.chatService.additionalServices.find(
        (s) => s.id === 'make-it-a-parade'
      );
      if (paradeService) {
        this.chatService.addItemToOrder({
          label: `${paradeService.label}: "${this.paradeMessage}"`,
          price: paradeService.price,
          quantity: 1,
        } as OrderItem);
        this.chatService.addMessage({
          user: 'Bot',
          text: `Got it. That's how you start a party! Great choice. Your parade message "${this.paradeMessage}" has been added to your order.`,
        });
        this.askForMoreItems();
      }
    }
  }

  askForMoreItems() {
    this.chatService.addMessage({
      user: 'Bot',
      text: `Your new subtotal is $${this.chatService.currentOrder.subtotal.toFixed(
        2
      )}. Would you like to add anything else to your order?`,
      choices: [
        {
          label: 'Yes',
          action: '*PLACE_ORDER*',
          value: 'N/A',
          icon: 'add',
          show: true,
        },
        {
          label: 'No',
          action: '*FINISH_ORDER*',
          value: 'N/A',
          icon: 'check',
          show: true,
        },
      ],
    });
  }

  finishOrder() {
    const orderSummary = this.chatService.getOrderSummary();
    this.chatService.addMessage({
      user: 'Bot',
      text: orderSummary,
    });
    this.initiatePayment();
  }

  initiatePayment() {
    this.chatService.addMessage({
      user: 'Bot',
      text: 'To make a payment for the first time, please follow this link to create your unique PIN: <www.____.com>',
    });
    this.chatService.addMessage({
      user: 'Bot',
      text: 'Please enter your unique PIN to confirm the payment and place your order.',
    });
  }

  handlePINEntry(pin: string) {
    // In a real application, you would validate the PIN here
    this.chatService.addMessage({
      user: 'Bot',
      text: 'Thank you for placing your order with "Bottcierge", get ready for the night of your life. Alana will be out shortly with your drinks. You\'ll receive another text message when your order is being prepared and when it\'s on the way.',
    });
    this.resetOrder();
  }

  resetOrder() {
    // Reset the current order and state
    this.chatService.currentOrder = {
      items: [],
      subtotal: 0,
      gratuity: 0,
      tax: 0,
      total: 0,
      table: 0,
    };
    this.currentState = 'MAIN_MENU';
    this.selectedVIPPackage = null;
    this.customizationCount = 0;
    this.paradeMessage = '';
    this.showMainMenu();
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      switch (this.currentState) {
        case 'PARADE_MESSAGE':
          this.handleParadeMessage(this.userMessage.trim());
          break;
        default:
          this.chatService.addMessage({
            user: 'User',
            text: this.userMessage.trim(),
          });
          // Handle other types of user input if needed
          break;
      }
      this.userMessage = '';
    }
  }
}
