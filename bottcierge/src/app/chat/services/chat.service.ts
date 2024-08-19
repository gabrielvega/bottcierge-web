import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  AdditionalService,
  Bottle,
  Brand,
  Choice,
  MainMenu,
  MenuCategory,
  Message,
  Order,
  OrderItem,
  SpiritCategory,
  VIPPackage,
} from './chat.interface';
import { RouteConfigLoadEnd } from '@angular/router';

const MAIN_MENU: MainMenu[] = [
  {
    id: '*PLACE_ORDER*',
    label: 'Place an order',
    action: '*PLACE_ORDER*',
    icon: 'add',
    show: true,
    price: 0,
    description: 'Place an order for food or drinks',
  },
  {
    id: '*CALL_SERVICE*',
    label: 'Call Alana',
    action: '*CALL_SERVICE*',
    icon: 'person',
    show: true,
    price: 0,
    description: 'Call Alana for assistance',
  },
  {
    id: '*CLOSE_ORDER*',
    label: 'Close tap',
    action: '*CLOSE_ORDER*',
    icon: 'receipt',
    show: false,
    price: 0,
    description: 'Close your tab',
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
          id: '*1231*',
          label: 'Tequila',
          action: '*SELECT_BRAND*',
          show: true,
          icon: 'liquor',
          brands: [
            {
              id: 'patron',
              label: 'Don Julio',
              icon: 'liquor',
              action: '*SELECT_BOTTLE*',
              show: true,
              bottles: [
                {
                  id: 'don-julio-blanco',
                  label: 'Don Julio Blanco',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 500,
                },
                {
                  id: 'don-julio-reposado',
                  label: 'Don Julio Reposado',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 525,
                },
                {
                  id: 'don-julio-anejo',
                  label: 'Don Julio 1942',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 1200,
                },
                {
                  id: 'don-julio-1942-magnum',
                  label: 'Don Julio 1942 MAGNUM 1.75L',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 2500,
                },
              ],
            },
            {
              id: 'clase-azul',
              label: 'Clase Azul',
              icon: 'liquor',
              action: '*SELECT_BOTTLE*',
              show: true,
              bottles: [
                {
                  id: 'clase-azul-blanco',
                  label: 'Clase Azul Anejo',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 599,
                },
                {
                  id: 'clase-azul-reposado',
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
          id: '*1232*',
          label: 'Scotch',
          action: '*SELECT_BRAND*',
          show: true,
          icon: 'liquor',
          brands: [
            {
              id: 'johnnie-walker',
              label: 'Johnnie Walker',
              action: '*SELECT_BOTTLE*',
              show: true,
              icon: 'liquor',
              bottles: [
                {
                  id: 'johnnie-walker-black',
                  label: 'Black Label',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 50,
                },
                {
                  id: 'johnnie-walker-gold',
                  label: 'Gold Label',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 100,
                },
                {
                  id: 'johnnie-walker-blue',
                  label: 'Blue Label',
                  icon: 'liquor',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 150,
                },
              ],
            },
            {
              id: 'dewars',
              label: 'Dewars',
              icon: 'liquor',
              action: '*SELECT_BOTTLE*',
              show: true,
              bottles: [
                {
                  id: 'dewars-white',
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
      spiritCategories: [
        {
          id: 'vip-packages',
          label: 'VIP Packages',
          action: '*SELECT_BRAND*',
          show: true,
          icon: 'star',
          brands: [
            {
              id: 'cheers-to-another-year',
              label: 'Cheers to Another Year Package',
              action: '*SELECT_VIP_PACKAGE*',
              show: true,
              icon: 'celebration',
              bottles: [
                {
                  id: 'cheers-to-another-year',
                  label: 'Cheers to Another Year Package',
                  action: '*ADD_ITEM*',
                  show: true,
                  icon: 'celebration',
                  price: 1000,
                  description:
                    '2 bottles of select call liquor and 2 house champagnes. Max guests: 12. Included: 2 Select Call Liquor, 2 House Champagnes. Customizable items: 2.',
                },
              ],
            },
            {
              id: 'ultimate-vip-celebration',
              label: 'The Ultimate VIP Celebration Package',
              action: '*SELECT_VIP_PACKAGE*',
              show: true,
              icon: 'celebration',
              bottles: [
                {
                  id: 'ultimate-vip-celebration',
                  label: 'The Ultimate VIP Celebration Package',
                  action: '*ADD_ITEM*',
                  show: true,
                  icon: 'celebration',
                  price: 1500,
                  description:
                    '3 bottles of select call liquor and 3 house champagnes. Max guests: 12. Included: 3 Select Call Liquor, 3 House Champagnes. Customizable items: 3.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '*345*',
      label: 'Wristband Packages',
      action: '*SELECT_CATEGORY*',
      show: true,
      icon: 'watch',
      spiritCategories: [
        {
          id: '*3451*',
          label: 'Island Breeze Package',
          action: '*SELECT_BRAND*',
          show: true,
          icon: 'beach_access',
          brands: [
            {
              id: '2-hours',
              label: '2 Hours (9pm-12am)',
              action: '*SELECT_BOTTLE*',
              show: true,
              icon: 'schedule',
              bottles: [
                {
                  id: 'island-breeze-2-hours',
                  label: 'Island Breeze Package - 2 Hours',
                  icon: 'watch',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 30,
                  description:
                    'Minimum of 15 guests, no max. Includes: Domestic Bottled Beer, House Champagne, All available draft beer, House red + white wine, Non-alcoholic beverages',
                },
              ],
            },
            {
              id: '3-hours',
              label: '3 Hours (9pm-12am)',
              action: '*SELECT_BOTTLE*',
              show: true,
              icon: 'schedule',
              bottles: [
                {
                  id: 'island-breeze-3-hours',
                  label: 'Island Breeze Package - 3 Hours',
                  icon: 'watch',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 35,
                  description:
                    'Minimum of 15 guests, no max. Includes: Domestic Bottled Beer, House Champagne, All available draft beer, House red + white wine, Non-alcoholic beverages',
                },
              ],
            },
          ],
        },
        {
          id: '*3452*',
          label: 'Tiki Tropics Package',
          action: '*SELECT_BRAND*',
          show: true,
          icon: 'beach_access',
          brands: [
            {
              id: '2-hours-2',
              label: '2 Hours (10pm-12am)',
              action: '*SELECT_BOTTLE*',
              show: true,
              icon: 'schedule',
              bottles: [
                {
                  id: 'tiki-tropics-2-hours',
                  label: 'Tiki Tropics Package - 2 Hours',
                  icon: 'watch',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 35,
                  description:
                    'Minimum of 15 guests, no max. Includes: Call Liquor Cocktails, Domestic Bottled Beer, House Champagne, All available draft beer, House red + white wine, Non-alcoholic beverages',
                },
              ],
            },
            {
              id: '3-hours',
              label: '3 Hours (9pm-12am)',
              action: '*SELECT_BOTTLE*',
              show: true,
              icon: 'schedule',
              bottles: [
                {
                  id: 'tiki-tropics-3-hours',
                  label: 'Tiki Tropics Package - 3 Hours',
                  icon: 'watch',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 40,
                  description:
                    'Minimum of 15 guests, no max. Includes: Call Liquor Cocktails, Domestic Bottled Beer, House Champagne, All available draft beer, House red + white wine, Non-alcoholic beverages',
                },
              ],
            },
          ],
        },
        {
          id: '*3453*',
          label: 'Coconut Craze Package',
          action: '*SELECT_BRAND*',
          show: true,
          icon: 'beach_access',
          brands: [
            {
              id: '2-hours-3',
              label: '2 Hours (10pm-12am)',
              action: '*SELECT_BOTTLE*',
              show: true,
              icon: 'schedule',
              bottles: [
                {
                  id: 'coconut-craze-2-hours',
                  label: 'Coconut Craze Package - 2 Hours',
                  icon: 'watch',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 45,
                  description:
                    'Minimum of 15 guests, no max. Includes: Premium Liquor Cocktails, Call Liquor Cocktails, Domestic Bottled Beer, House Champagne, All available draft beer, House red + white wine, Non-alcoholic beverages',
                },
              ],
            },
            {
              id: '3-hours-2',
              label: '3 Hours (9pm-12am)',
              action: '*SELECT_BOTTLE*',
              show: true,
              icon: 'schedule',
              bottles: [
                {
                  id: 'coconut-craze-3-hours',
                  label: 'Coconut Craze Package - 3 Hours',
                  icon: 'watch',
                  action: '*ADD_ITEM*',
                  show: true,
                  price: 50,
                  description:
                    'Minimum of 15 guests, no max. Includes: Premium Liquor Cocktails, Call Liquor Cocktails, Domestic Bottled Beer, House Champagne, All available draft beer, House red + white wine, Non-alcoholic beverages',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '*456*',
      label: 'EXTRA Mixers, Energy Drinks, ICE & cups',
      action: '*SELECT_CATEGORY*',
      show: true,
      icon: 'liquor',
      spiritCategories: [
        {
          id: 'ice',
          label: 'Ice',
          action: '*ADD_ITEM*',
          show: true,
          price: 10,
          icon: 'ac_unit',
          brands: [],
        },
        {
          id: 'orange-juice',
          label: 'Orange Juice',
          action: '*ADD_ITEM*',
          show: true,
          price: 10,
          icon: 'grocery',
          brands: [],
        },
        {
          id: 'cranberry-juice',
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
      id: category.id,
      label: category.label,
      action: category.action,
      value: category.id,
      icon: category.icon,
      show: category.show,
    }));
  }

  getSpiritCategories(menuCategoryId: string): SpiritCategory[] {
    const category = this.menuCategories.find((c) => c.id === menuCategoryId);
    return category ? category.spiritCategories : [];
  }

  getBrands(spiritCategoryId: string): Brand[] {
    const category = this.menuCategories
      .flatMap((c) => c.spiritCategories)
      .find((s) => s.id === spiritCategoryId);
    return category ? category.brands : [];
  }

  getBottles(brandId: string): Bottle[] {
    const brand = this.menuCategories
      .flatMap((c) => c.spiritCategories)
      .flatMap((s) => s.brands)
      .find((b) => b.id === brandId);
    return brand ? brand.bottles : [];
  }

  getVIPPackages(): Choice[] {
    return this.vipPackages.map((pkg) => ({
      id: pkg.id,
      label: `${pkg.label} $${pkg.price}`,
      action: '*SELECT_VIP_PACKAGE*',
      value: pkg.id,
      icon: 'star',
      show: true,
    }));
  }

  getAdditionalServices(): Choice[] {
    return this.additionalServices.map((service) => ({
      id: service.id,
      label: `${service.label} $${service.price}`,
      action: '*ADD_ADDITIONAL_SERVICE*',
      value: service.id,
      icon: 'add_circle',
      show: true,
    }));
  }

  addItemToOrder(item: OrderItem) {
    const existingItem = this.currentOrder.items.find(
      (i) => i.label === item.label && i.description === item.description
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.currentOrder.items.push(item);
    }
    console.log(this.currentOrder.items);
    // console.log(this.reorderItems(this.currentOrder.items));
    // this.reorderItems();
    // this.currentOrder.items = this.reorderItems(this.currentOrder.items);
    this.updateOrderTotals();
  }

  reorderItems() {
    // Create a map to quickly access items by label
    const labelMap = new Map<string, OrderItem>();

    this.currentOrder.items.forEach((item) => {
      if (!labelMap.has(item.label)) {
        labelMap.set(item.label, item);
      }
    });

    // Sort items based on the criteria
    this.currentOrder.items.sort((a, b) => {
      const aIsDescription = labelMap.has(a.description || '');
      const bIsDescription = labelMap.has(b.description || '');

      if (aIsDescription && !bIsDescription) {
        return 1;
      } else if (!aIsDescription && bIsDescription) {
        return -1;
      } else if (aIsDescription && bIsDescription) {
        return (
          this.currentOrder.items.indexOf(
            labelMap.get(a.description || '') as OrderItem
          ) -
          this.currentOrder.items.indexOf(
            labelMap.get(b.description || '') as OrderItem
          )
        );
      } else {
        return (
          this.currentOrder.items.indexOf(a) -
          this.currentOrder.items.indexOf(b)
        );
      }
    });
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
    localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));
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
