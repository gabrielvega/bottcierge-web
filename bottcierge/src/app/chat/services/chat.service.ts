import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  AdditionalService,
  Choice,
  MenuCategory,
  Message,
  Order,
  OrderItem,
  VIPPackage,
} from './chat.interface';

const MAIN_MENU = [
  {
    label: 'Place an order',
    action: '*PLACE_ORDER*',
    value: 'N/A',
    icon: 'add',
    show: true,
  },
  {
    label: 'Call Alana',
    action: '*CALL_SERVICE*',
    value: 'N/A',
    icon: 'person',
    show: true,
  },
  {
    label: 'Close tap',
    action: '*CLOSE_ORDER*',
    value: 'N/A',
    icon: 'receipt',
    show: false,
  },
];

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public currentOrder: Order = {
    items: [],
    subtotal: 0,
    gratuity: 0,
    tax: 0,
    total: 0,
    table: 0,
  };

  private messages = new BehaviorSubject<Message[]>([]);
  messages$ = this.messages.asObservable();

  foodMenuOptions = [
    {
      label: 'Bottle List, A La Carte',
      action: '*123*',
      value: 'N/A',
      icon: 'assets/BedroomIcon2.png',
    },
    {
      label: 'VIP Packages',
      action: '*234*',
      value: 'N/A',
      icon: 'assets/BedroomIcon2.png',
    },
    {
      label: 'Wristband Packages',
      action: '*345*',
      value: 'N/A',
      icon: 'assets/BedroomIcon2.png',
    },
    {
      label: 'EXTRA Mixers, Energy Drinks, ICE & cups',
      action: '*456*',
      value: 'N/A',
      icon: 'assets/BedroomIcon2.png',
    },
    {
      label: 'Make it a Parade',
      action: '*567*',
      value: 'N/A',
      icon: 'assets/BedroomIcon2.png',
    },
    {
      label: 'Back to Main Menu',
      action: '*000*',
      value: 'N/A',
      icon: 'assets/BedroomIcon2.png',
    },
  ];

  menuCategories: MenuCategory[] = [
    {
      id: '*123*',
      label: 'Bottle List, A La Carte',
      action: '*SELECT_CATEGORY*',
      show: true,
      icon: 'liquor',
      spiritCategories: [
        {
          label: 'Tequila',
          action: '*SELECT_BRAND*',
          show: true,
          icon: 'liquor',
          brands: [
            {
              label: 'Don Julio',
              icon: 'liquor',
              action: '*SELECT_BOTTLE*',
              show: true,
              bottles: [
                {
                  label: 'Don Julio Blanco',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 500,
                },
                {
                  label: 'Don Julio Reposado',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 525,
                },
                {
                  label: 'Don Julio 1942',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 1200,
                },
                {
                  label: 'Don Julio 1942 MAGNUM 1.75L',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 2500,
                },
              ],
            },
            {
              label: 'Clase Azul',
              icon: 'liquor',
              action: '*SELECT_BOTTLE*',
              show: true,
              bottles: [
                {
                  label: 'Clase Azul Anejo',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 599,
                },
                {
                  label: 'Clase Azul Reposado',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 549,
                },
              ],
            },
            // Add other tequila brands similarly
          ],
        },
        {
          label: 'Scotch',
          action: '*SELECT_BRAND*',
          show: true,
          icon: 'liquor',
          brands: [
            {
              label: 'Johnnie Walker',
              action: '*SELECT_BOTTLE*',
              show: true,
              icon: 'liquor',
              bottles: [
                {
                  label: 'Black Label',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 50,
                },
                {
                  label: 'Gold Label',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 100,
                },
                {
                  label: 'Blue Label',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 150,
                },
              ],
            },
            {
              label: 'Dewars',
              icon: 'liquor',
              action: '*SELECT_BOTTLE*',
              show: true,
              bottles: [
                {
                  label: 'White Label',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 599,
                },
              ],
            },
            // Add other tequila brands similarly
          ],
        },
        // Add other spirit categories similarly
      ],
    },
    {
      id: '*234*',
      label: 'VIP Packages',
      action: '*SELECT_CATEGORY*',
      show: true,
      icon: 'star',
      spiritCategories: [],
    },
    {
      id: '*345*',
      label: 'Wristband Packages',
      action: '*SELECT_CATEGORY*',
      show: true,
      icon: 'watch',
      spiritCategories: [],
    },
    {
      id: '*456*',
      label: 'EXTRA Mixers, Energy Drinks, ICE & cups',
      action: '*SELECT_CATEGORY*',
      show: true,
      icon: 'liquor',
      spiritCategories: [
        {
          label: 'Ice',
          action: '*ADD_ITEM*',
          show: true,
          price: 10,
          icon: 'ac_unit',
          brands: [],
        },
        {
          label: 'Orange Juice',
          action: '*ADD_ITEM*',
          show: true,
          price: 10,
          icon: 'grocery',
          brands: [],
        },
        {
          label: 'Cranberry Juice',
          action: '*ADD_ITEM*',
          show: true,
          price: 10,
          icon: 'water_full',
          brands: [],
        },
      ],
    },
    {
      id: '*567*',
      label: 'Make it a Parade',
      action: '*SELECT_CATEGORY*',
      show: true,
      icon: 'celebration',
      spiritCategories: [],
    },
    // {
    //   id: '*000*',
    //   label: 'Main Menu',
    //   action: "*SELECT_CATEGORY*",
    //   icon: 'menu',
    //   spiritCategories: []
    // }
  ];

  constructor() {}

  vipPackages: VIPPackage[] = [
    {
      id: 'cheers-to-another-year',
      label: 'Cheers to Another Year Package',
      price: 1000,
      description: '2 bottles of select call liquor and 2 house champagnes',
      maxGuests: 12,
      includedItems: ['2 Select Call Liquor', '2 House Champagnes'],
      customizableItems: 2,
    },
    {
      id: 'ultimate-vip-celebration',
      label: 'The Ultimate VIP Celebration Package',
      price: 1500,
      description: '3 bottles of select call liquor and 3 house champagnes',
      maxGuests: 12,
      includedItems: ['3 Select Call Liquor', '3 House Champagnes'],
      customizableItems: 3,
    },
  ];

  additionalServices: AdditionalService[] = [
    {
      id: 'make-it-a-parade',
      label: 'Make it a Parade',
      price: 250,
      description: 'Customize your own parade message',
    },
  ];

  getMenuCategories(): Choice[] {
    return this.menuCategories.map((category) => ({
      label: category.label,
      action: category.action,
      value: category.id,
      icon: category.icon,
      show: category.show,
    }));
  }

  getSpiritCategories(menuCategoryId: string): Choice[] {
    const category = this.menuCategories.find((c) => c.id === menuCategoryId);
    return category
      ? category.spiritCategories.map((spirit) => ({
          label: spirit.label,
          action: '*SELECT_BRAND*',
          value: spirit.label,
          icon: spirit.icon,
          show: spirit.show,
        }))
      : [];
  }

  getBrands(spiritCategory: string): Choice[] {
    const category = this.menuCategories
      .flatMap((c) => c.spiritCategories)
      .find((s) => s.label === spiritCategory);
    return category
      ? category.brands.map((brand) => ({
          label: brand.label,
          action: '*SELECT_BOTTLE*',
          value: brand.label,
          icon: brand.icon,
          show: brand.show,
        }))
      : [];
  }

  getBottles(brand: string): Choice[] {
    const brandObj = this.menuCategories
      .flatMap((c) => c.spiritCategories)
      .flatMap((s) => s.brands)
      .find((b) => b.label === brand);
    return brandObj
      ? brandObj.bottles.map((bottle) => ({
          label: `${bottle.label} $${bottle.price}`,
          action: '*ADD_ITEM*',
          value: JSON.stringify(bottle),
          icon: bottle.icon,
          show: bottle.show,
        }))
      : [];
  }

  getVIPPackages(): Choice[] {
    return this.vipPackages.map((pkg) => ({
      label: `${pkg.label} $${pkg.price}`,
      action: '*SELECT_VIP_PACKAGE*',
      value: pkg.id,
      icon: 'star',
      show: true,
    }));
  }

  getAdditionalServices(): Choice[] {
    return this.additionalServices.map((service) => ({
      label: `${service.label} $${service.price}`,
      action: '*ADD_ADDITIONAL_SERVICE*',
      value: service.id,
      icon: 'add_circle',
      show: true,
    }));
  }

  addItemToOrder(item: OrderItem) {
    const existingItem = this.currentOrder.items.find(
      (i) => i.label === item.label
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.currentOrder.items.push(item);
    }
    this.updateOrderTotals();
  }

  updateOrderTotals() {
    this.currentOrder.subtotal = this.currentOrder.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    this.currentOrder.gratuity = this.currentOrder.subtotal * 0.2;
    this.currentOrder.tax = this.currentOrder.subtotal * 0.08;
    this.currentOrder.total =
      this.currentOrder.subtotal +
      this.currentOrder.gratuity +
      this.currentOrder.tax;
  }

  getOrderSummary(): string {
    let summary = 'Here is a summary of your receipt for this Order #####\n\n';
    this.currentOrder.items.forEach((item) => {
      summary += `${item.quantity} ${item.label} $${
        item.price * item.quantity
      }\n`;
    });
    summary += `\nSubtotal: $${this.currentOrder.subtotal.toFixed(2)}\n`;
    summary += `Gratuity @20%: $${this.currentOrder.gratuity.toFixed(2)}\n`;
    summary += `Tax @8%: $${this.currentOrder.tax.toFixed(2)}\n`;
    summary += `Total: $${this.currentOrder.total.toFixed(2)}\n`;
    return summary;
  }

  addMessage(message: Message) {
    const currentMessages = this.messages.value;
    currentMessages.push(message);
    this.messages.next(currentMessages);
  }

  canIClick(index: number) {
    console.log(index, this.messages.getValue().length - 1);
    return index === this.messages.getValue().length - 1;
  }

  mainMenu(closeTap: boolean) {
    return [
      {
        label: 'Place new order',
        action: '*PLACE_ORDER*',
        value: 'N/A',
        icon: 'add',
        show: true,
      },
      {
        label: 'Call Alana',
        action: '*CALL_SERVICE*',
        value: 'N/A',
        icon: 'person',
        show: true,
      },
      {
        label: 'Close tap',
        action: '*CLOSE_ORDER*',
        value: 'N/A',
        icon: 'receipt',
        show: closeTap,
      },
    ];
  }
}
