import { ShopifyProduct, ShopifyCollection } from '@/types/shopify';

export const FALLBACK_PRODUCTS: ShopifyProduct[] = [
  // 1. Capita DOA
  {
    id: 'gid://shopify/Product/1',
    title: 'Capita Defenders of Awesome (DOA) Snowboard',
    handle: 'capita-doa-snowboard',
    description: 'Семиразовий володар премії Transworld Good Wood Award та найпопулярніша дошка в лінійці Capita. Створена на австрійській фабриці The Mothership з відновлюваної енергії. Гібридний прогин Resort V1 поєднує вибухове клацання класичного кембера між кріпленнями із плавними контактними зонами на носі й хвості для чистого катання в парку та на трасі.',
    availableForSale: true,
    vendor: 'Capita',
    productType: 'Сноуборди',
    isStaffPick: true,
    rating: 4.9,
    reviewCount: 128,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=1000&auto=format&fit=crop',
      altText: 'Capita Defenders of Awesome DOA Snowboard',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=1000&auto=format&fit=crop',
            altText: 'Capita DOA board profile',
          },
        },
        {
          node: {
            url: 'https://images.unsplash.com/photo-1522056615691-da7b810682b5?q=80&w=1000&auto=format&fit=crop',
            altText: 'Rider on Capita DOA',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '499.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '519.00', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '560.00', currencyCode: 'USD' },
    tags: ['Сноуборди', 'Staff Pick', 'Resort V1', 'Good Wood Winner', 'Park & All-Mountain'],
    specs: {
      flex: '5.5/10 (Ідеальний збалансований фрістайл)',
      flexRating: 5.5,
      profile: 'Resort V1 Camber (Zero Camber + Rocker Tips)',
      camberType: 'hybrid',
      shape: 'True Twin (Повна симетрія)',
      terrain: 'Resort / Park / All-Mountain',
      level: 'Intermediate – Advanced',
      gender: 'men',
      subCategory: "Men's Snowboards",
      origin: 'The Mothership, Австрія',
      warranty: '2 роки офіційної гарантії',
      waistWidth: '248 мм (152), 250 мм (154), 252 мм (156), 260 мм (157W)',
      features: ['Dual Blaster Ashpop Core', 'Fortress Aramid Bound Sidewalls', 'Quantum Drive Sintered Base', 'Holysheet Fiberglass'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/101',
            title: '152 см',
            availableForSale: true,
            price: { amount: '499.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/102',
            title: '154 см',
            availableForSale: true,
            price: { amount: '499.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/103',
            title: '156 см',
            availableForSale: true,
            price: { amount: '499.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/104',
            title: '157 см WIDE (Взуття 44+ EU)',
            availableForSale: true,
            price: { amount: '519.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/105',
            title: '160 см (Вага 75-95 кг)',
            availableForSale: true,
            price: { amount: '519.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 2. Lib Tech T.Rice Pro HP
  {
    id: 'gid://shopify/Product/2',
    title: 'Lib Tech T.Rice Pro HP C2X Snowboard',
    handle: 'lib-tech-trice-pro-snowboard',
    description: 'Фірмова зброя легенди фрірайду Тревіса Райса (Travis Rice). Створена вручну в США (Mervin Made) з нульовими шкідливими викидами. Оснащена хвилястими кантами Magne-Traction (7 зубців «ножа для хліба»), які вгризаються в кригу там, де інші дошки зісковзують. Прогин C2X дає міць кембера на швидкості та невтомну плавучість у глибокому снігу.',
    availableForSale: true,
    vendor: 'Lib Tech',
    productType: 'Сноуборди',
    isStaffPick: true,
    rating: 5.0,
    reviewCount: 94,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1000&auto=format&fit=crop',
      altText: 'Lib Tech T.Rice Pro Snowboard',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1000&auto=format&fit=crop',
            altText: 'Lib Tech T.Rice base view',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '599.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '629.00', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '670.00', currencyCode: 'USD' },
    tags: ['Сноуборди', 'Magne-Traction', 'C2X', 'Mervin Made', 'All-Mountain & Freeride'],
    specs: {
      flex: '7/10 (Потужний заряджений All-Mountain)',
      flexRating: 7,
      profile: 'C2X (Aggressive Rocker/Camber Hybrid)',
      camberType: 'hybrid',
      shape: 'Blunt Freeride / True Twin Contour',
      terrain: 'Big Mountain / Powder / Hardpack',
      level: 'Advanced – Expert',
      gender: 'men',
      subCategory: "Men's Snowboards",
      origin: 'Mervin Manufacturing, штат Вашингтон, США',
      warranty: '1 рік Mervin Made гарантія',
      waistWidth: '253 мм (155), 255 мм (157), 263 мм (157W)',
      features: ['Magne-Traction 7-Point Serrated Edges', 'Horsepower (HP) Construction (60% Aspen / 40% Paulownia)', 'Eco-Sublimated Bio Beans Top', 'Sintered Knife Cut Base'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/201',
            title: '155 см (Вага 55-75 кг)',
            availableForSale: true,
            price: { amount: '599.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/202',
            title: '157 см (Вага 65-85 кг)',
            availableForSale: true,
            price: { amount: '599.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/203',
            title: '157 см WIDE (Для ноги 44+ EU)',
            availableForSale: true,
            price: { amount: '629.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/204',
            title: '161 см (Вага 75-100 кг)',
            availableForSale: true,
            price: { amount: '629.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 3. Burton Custom Flying V
  {
    id: 'gid://shopify/Product/3',
    title: 'Burton Custom Flying V Hybrid Snowboard',
    handle: 'burton-custom-flying-v-snowboard',
    description: 'Найвідоміша дошка в історії сноубордингу з 1996 року. Гібридний профіль Flying V поєднує центральний рокер для серферської легкості у свіжому пухляку та кемберні зони під кріпленнями для чіпкості під час агресивного карвінгу. Канал The Channel забезпечує мікрорегулювання стійки з точністю до міліметра.',
    availableForSale: true,
    vendor: 'Burton',
    productType: 'Сноуборди',
    isStaffPick: false,
    rating: 4.8,
    reviewCount: 156,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1522056615691-da7b810682b5?q=80&w=1000&auto=format&fit=crop',
      altText: 'Burton Custom Flying V Snowboard',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1522056615691-da7b810682b5?q=80&w=1000&auto=format&fit=crop',
            altText: 'Burton Custom top graphic',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '549.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '579.00', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '630.00', currencyCode: 'USD' },
    tags: ['Сноуборди', 'Flying V', 'Легенда', 'The Channel', 'All-Mountain'],
    specs: {
      flex: '6/10 (Універсальна середня жорсткість)',
      flexRating: 6,
      profile: 'Flying V (Rocker/Camber Hybrid)',
      camberType: 'hybrid',
      shape: 'Directional Shape (Зміщений центр ваги)',
      terrain: 'All-Mountain / Powder / Groomers',
      level: 'Intermediate – Advanced',
      gender: 'men',
      subCategory: "Men's Snowboards",
      origin: 'Австрія (Оригінал Burton Europe)',
      warranty: '3 роки фірмової гарантії WMS',
      waistWidth: '250 мм (154), 254 мм (158), 262 мм (158W)',
      features: ['Super Fly II 700G Core', '45° Carbon Highlights', 'WFO Sintered Base', 'The Channel Mounting System', 'Frostbite Edges'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/301',
            title: '154 см',
            availableForSale: true,
            price: { amount: '549.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/302',
            title: '156 см',
            availableForSale: true,
            price: { amount: '549.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/303',
            title: '158 см',
            availableForSale: true,
            price: { amount: '549.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/304',
            title: '158 см WIDE (Для взуття 44+ EU)',
            availableForSale: true,
            price: { amount: '579.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 4. Salomon Assassin All-Mountain
  {
    id: 'gid://shopify/Product/4',
    title: 'Salomon Assassin All-Mountain Snowboard',
    handle: 'salomon-assassin-snowboard',
    description: 'Універсальний кілер будь-яких гірських схилів. Об’єднує прогресивну геометрію для парку та фрірайду. Профіль Rock Out Camber плоский між кріпленнями для стійкості, з кембером біля ніг для чуйності та рокером на кінцях для легкого спливання у пухляку. Сердечник з бамбуковими стержнями ABC Wrapper.',
    availableForSale: true,
    vendor: 'Salomon',
    productType: 'Сноуборди',
    isStaffPick: false,
    rating: 4.8,
    reviewCount: 71,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1000&auto=format&fit=crop',
      altText: 'Salomon Assassin Snowboard',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1000&auto=format&fit=crop',
            altText: 'Salomon Assassin board graphic',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '519.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '539.00', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '580.00', currencyCode: 'USD' },
    tags: ['Сноуборди', 'Rock Out Camber', 'All-Mountain', 'Popster Eco Booster'],
    specs: {
      flex: '6/10 (Чуйний універсал)',
      flexRating: 6,
      profile: 'Rock Out Camber (Flat-Camber-Rocker)',
      camberType: 'hybrid',
      shape: 'Directional Twin',
      terrain: 'All-Mountain / Powder / Park',
      level: 'Intermediate – Advanced',
      gender: 'men',
      subCategory: "Men's Snowboards",
      origin: 'Франція / Склад ЄС',
      warranty: '2 роки офіційної гарантії Salomon',
      waistWidth: '251 мм (153), 253 мм (156), 263 мм (158W)',
      features: ['Ghost Green Core', 'Popster Eco Booster', 'Quadralizer Sidecut', 'Sintered EG Base'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/401',
            title: '153 см',
            availableForSale: true,
            price: { amount: '519.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/402',
            title: '156 см',
            availableForSale: true,
            price: { amount: '519.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/403',
            title: '158 см WIDE (Взуття 44+ EU)',
            availableForSale: true,
            price: { amount: '539.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 5. GNU Riders Choice Asym C2X
  {
    id: 'gid://shopify/Product/5',
    title: 'GNU Riders Choice Asym C2X Snowboard',
    handle: 'gnu-riders-choice-asym-snowboard',
    description: 'Дошка, створена самими райдерами для райдерів. Асиметрична геометрія враховує різну механіку переднього та заднього кантів: задній кант має глибший боковий виріз і м’якший сердечник, що робить повороти з п’яти такими ж легкими, як і з носка. Канти Magne-Traction гарантують надійне зчеплення.',
    availableForSale: true,
    vendor: 'GNU',
    productType: 'Сноуборди',
    isStaffPick: true,
    rating: 4.9,
    reviewCount: 63,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1000&auto=format&fit=crop',
      altText: 'GNU Riders Choice Snowboard',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1000&auto=format&fit=crop',
            altText: 'GNU Asym sidecut detail',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '579.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '599.00', currencyCode: 'USD' },
    },
    tags: ['Сноуборди', 'Asymmetry', 'Magne-Traction', 'Mervin Made', 'Freestyle'],
    specs: {
      flex: '6/10 (Грайлива середня жорсткість)',
      flexRating: 6,
      profile: 'C2X (Xtreme Camber/Rocker Hybrid)',
      camberType: 'hybrid',
      shape: 'Asym Twin Freestyle',
      terrain: 'Park / Resort / All-Mountain',
      level: 'Intermediate – Advanced',
      gender: 'men',
      subCategory: "Men's Snowboards",
      origin: 'США (Mervin Made)',
      warranty: '1 рік офіційної гарантії',
      waistWidth: '252 мм (154.5), 255 мм (157.5), 265 мм (158W)',
      features: ['Asymmetric Level 2 (Core, Sidecut, Contact)', 'G Lite 3 FSC Certified Wood Core', 'Magne-Traction Edge Control', 'Eco-Sublimated Bio Beans Top'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/501',
            title: '154.5 см',
            availableForSale: true,
            price: { amount: '579.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/502',
            title: '157.5 см',
            availableForSale: true,
            price: { amount: '579.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/503',
            title: '158 см WIDE (Для ноги 44+ EU)',
            availableForSale: true,
            price: { amount: '599.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 6. Nitro Team Pro Marcus Kleveland
  {
    id: 'gid://shopify/Product/6',
    title: 'Nitro Team Pro Marcus Kleveland Camber Snowboard',
    handle: 'nitro-team-pro-snowboard',
    description: 'Заряджена версія бестселера Nitro Team, на якій катається вундеркінд Маркус Клевеланд. Профіль Trüe Camber, карбонові підсилювачі Diamond Bands та надшвидкісна спечена база Speed Formula II Sintered Base забезпечують неймовірну висоту на трамплінах та залізне тримання на крижаному вельветі.',
    availableForSale: true,
    vendor: 'Nitro',
    productType: 'Сноуборди',
    isStaffPick: true,
    rating: 5.0,
    reviewCount: 88,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1522056615691-da7b810682b5?q=80&w=1000&auto=format&fit=crop',
      altText: 'Nitro Team Pro Snowboard',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1522056615691-da7b810682b5?q=80&w=1000&auto=format&fit=crop',
            altText: 'Nitro Team rider',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '499.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '529.00', currencyCode: 'USD' },
    },
    tags: ['Сноуборди', 'Trüe Camber', 'Pro Series', 'Marcus Kleveland', 'Carving'],
    specs: {
      flex: '8/10 (Жорсткий, вибуховий контроль)',
      flexRating: 8,
      profile: 'Trüe Camber (Класичний кембер високого навантаження)',
      camberType: 'camber',
      shape: 'Directional Twin',
      terrain: 'All-Mountain / Big Air / Carving',
      level: 'Advanced – Pro',
      gender: 'men',
      subCategory: "Men's Snowboards",
      origin: 'Австрія (Оригінал, склад Європа)',
      warranty: '2 роки офіційної гарантії Nitro',
      waistWidth: '250 мм (155), 252 мм (157), 264 мм (159W)',
      features: ['Powerlite Core', 'Diamond Band Carbon Upgrades', 'Sintered Speed Formula II Base', 'Reflex Core Profile'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/601',
            title: '155 см (Вага 55-75 кг)',
            availableForSale: true,
            price: { amount: '499.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/602',
            title: '157 см (Вага 65-85 кг)',
            availableForSale: true,
            price: { amount: '499.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/603',
            title: '159 см WIDE (Для ноги 44+ EU)',
            availableForSale: true,
            price: { amount: '529.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 7. Jones Mountain Twin
  {
    id: 'gid://shopify/Product/7',
    title: 'Jones Mountain Twin All-Mountain Snowboard',
    handle: 'jones-mountain-twin-snowboard',
    description: 'Еталон всесезонного фрірайду та беккантрі від легендарного Джеремі Джонса. Профіль CamRock із 3D Contour Base 2.0 (ложкаподібні підняті канти на носі та хвості) практично виключає випадкові «зловлення канта» та забезпечує неперевершену плавучість у глибокому снігу.',
    availableForSale: true,
    vendor: 'Jones',
    productType: 'Сноуборди',
    isStaffPick: true,
    rating: 4.9,
    reviewCount: 110,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1000&auto=format&fit=crop',
      altText: 'Jones Mountain Twin Snowboard',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1000&auto=format&fit=crop',
            altText: 'Jones 3D Contour Base',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '529.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '559.00', currencyCode: 'USD' },
    },
    tags: ['Сноуборди', '3D Contour', 'CamRock', 'Jeremy Jones', 'Freeride & Powder'],
    specs: {
      flex: '7/10 (Впевнений, стабільний контроль)',
      flexRating: 7,
      profile: 'CamRock (Camber underfoot, Rocker at tip/tail)',
      camberType: 'hybrid',
      shape: 'Directional Twin',
      terrain: 'All-Mountain / Powder / Freestyle',
      level: 'Intermediate – Expert',
      gender: 'men',
      subCategory: "Men's Snowboards",
      origin: 'ОАЕ / Дубай (Nidecker Group Factory, розроблено в Каліфорнії)',
      warranty: '2+1 рік гарантії Jones WMS',
      waistWidth: '252 мм (154), 256 мм (157), 260 мм (159W)',
      features: ['3D Contour Base 2.0', 'Traction Tech 3.0 Edges', 'Control Split Core', 'Sintered 8000 Base', 'Bio Resin Eco Topsheet'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/701',
            title: '154 см',
            availableForSale: true,
            price: { amount: '529.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/702',
            title: '157 см',
            availableForSale: true,
            price: { amount: '529.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/703',
            title: '159 см WIDE (Взуття 44+ EU)',
            availableForSale: true,
            price: { amount: '559.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 8. Bataleon Evil Twin 3BT
  {
    id: 'gid://shopify/Product/8',
    title: 'Bataleon Evil Twin 3BT Park Snowboard',
    handle: 'bataleon-evil-twin-snowboard',
    description: 'Легендарна паркова машина з запатентованою технологією Triple Base Technology (3BT) та SideKick. Центральна плоска база тримає стабільність, а підняті бічні крила на носі та хвості дають надзвичайно плавний вхід у трюки без ризику зачепитися за рейли чи сніг.',
    availableForSale: true,
    vendor: 'Bataleon',
    productType: 'Сноуборди',
    isStaffPick: false,
    rating: 4.8,
    reviewCount: 52,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=1000&auto=format&fit=crop',
      altText: 'Bataleon Evil Twin Snowboard',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=1000&auto=format&fit=crop',
            altText: 'Bataleon 3BT detail',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '489.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '509.00', currencyCode: 'USD' },
    },
    tags: ['Сноуборди', '3BT', 'Twin 3BT', 'SideKick', 'Park & Jib'],
    specs: {
      flex: '5/10 (Грайливий джиб & парк)',
      flexRating: 5,
      profile: 'Medium Camber + Twin 3BT + SideKick',
      camberType: 'camber',
      shape: 'True Twin (Симетрична форма)',
      terrain: 'Park / Jib / Resort Freestyle',
      level: 'All Levels',
      gender: 'men',
      subCategory: "Men's Snowboards",
      origin: 'Австрія (Склад ЄС)',
      warranty: '2 роки офіційної гарантії Bataleon',
      waistWidth: '250 мм (154), 253 мм (157), 263 мм (156W)',
      features: ['Twin 3BT (Triple Base Technology)', 'SideKick Tips', 'Ultra Light Wood Core', 'C.S.T. SuperTubes Carbon Rods', 'Hyper Glide S Base'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/801',
            title: '154 см',
            availableForSale: true,
            price: { amount: '489.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/802',
            title: '157 см',
            availableForSale: true,
            price: { amount: '489.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/803',
            title: '156 см WIDE (Для ноги 44+ EU)',
            availableForSale: true,
            price: { amount: '509.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 9. ThirtyTwo TM-2 Double BOA Boots
  {
    id: 'gid://shopify/Product/9',
    title: 'ThirtyTwo TM-2 Double BOA Snowboard Boots',
    handle: 'thirtytwo-tm2-double-boa-boots',
    description: 'Улюблена модель про-райдерів команди ThirtyTwo (Scotty Stevens, Chris Grenier). Двозонна система шнурівки Dual BOA з міцним тросом TX3 дозволяє за 3 секунди відрегулювати щільність фіксації стопи та гомілки. Термоформований внутрішник Performance Fit з піни Intuition запікається за формою вашої стопи.',
    availableForSale: true,
    vendor: 'ThirtyTwo',
    productType: 'Взуття',
    isStaffPick: true,
    rating: 4.9,
    reviewCount: 142,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
      altText: 'ThirtyTwo TM-2 Double BOA Boots',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
            altText: 'BOA dial close-up',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '369.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '369.00', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '410.00', currencyCode: 'USD' },
    tags: ['Взуття', 'Double BOA', 'Staff Pick', 'Intuition Foam', 'All-Mountain'],
    specs: {
      flex: '7/10 (Точний спортивний флекс)',
      flexRating: 7,
      profile: 'Dual BOA Focus Fit System w/ TX3 Lace',
      shape: '1:1 Lasting Ergonomic Shell',
      terrain: 'All-Mountain / Park / Freeride',
      level: 'Intermediate – Pro',
      gender: 'men',
      subCategory: "Men's Snowboard Boots",
      origin: 'Нідерланди / Склад ЄС',
      warranty: '2 роки гарантії',
      features: ['Intuition Performance Foam Liner', 'Performance Rubber Outsole with STI Evolution Foam', 'Storm Shield All-Weather Protection', 'Overmold TPU Armor'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/901',
            title: '41 EU (8.5 US / 26.5 см)',
            availableForSale: true,
            price: { amount: '369.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/902',
            title: '42 EU (9.0 US / 27.0 см)',
            availableForSale: true,
            price: { amount: '369.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/903',
            title: '43 EU (10.0 US / 28.0 см)',
            availableForSale: true,
            price: { amount: '369.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/904',
            title: '44 EU (10.5 US / 28.5 см)',
            availableForSale: true,
            price: { amount: '369.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/905',
            title: '45 EU (11.5 US / 29.5 см)',
            availableForSale: true,
            price: { amount: '369.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 10. Vans Hi-Standard Pro
  {
    id: 'gid://shopify/Product/10',
    title: 'Vans Hi-Standard Pro Snowboard Boots',
    handle: 'vans-hi-standard-pro-boots',
    description: 'Класична естетика кедів Vans у поєднанні з передовими технологіями для сноуборду. Традиційна шнурівка з додатковим силовим ременем PowerCuff Strap для точного налаштування підтримки хайбека. Термоформований внутрішник V2 UltraCush з натуральною вовною Smartwool зберігає ноги сухими й теплими.',
    availableForSale: true,
    vendor: 'Vans',
    productType: 'Взуття',
    isStaffPick: false,
    rating: 4.8,
    reviewCount: 95,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
      altText: 'Vans Hi-Standard Pro Snowboard Boots',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
            altText: 'Vans waffle sole detail',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '289.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '289.00', currencyCode: 'USD' },
    },
    tags: ['Взуття', 'Vans', 'Lace Boots', 'Smartwool', 'Freestyle & Park'],
    specs: {
      flex: '5-6/10 (Гнучкий скейт-стиль)',
      flexRating: 5.5,
      profile: 'Traditional Lace w/ PowerCuff Strap',
      shape: 'PleasureCuff Ergonomic Comfort',
      terrain: 'Park / Street / All-Mountain',
      level: 'All Levels',
      gender: 'men',
      subCategory: "Men's Snowboard Boots",
      origin: 'США / Vans Europe',
      warranty: '2 роки офіційної гарантії Vans',
      features: ['V2 UltraCush Smartwool Liner', 'V2 Waffle Pro Rubber Outsole', 'V2 POPCUSH Footbed', 'PowerCuff Ankle Strap'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/1001',
            title: '41 EU (8.5 US / 26.5 см)',
            availableForSale: true,
            price: { amount: '289.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1002',
            title: '42 EU (9.0 US / 27.0 см)',
            availableForSale: true,
            price: { amount: '289.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1003',
            title: '43 EU (10.0 US / 28.0 см)',
            availableForSale: true,
            price: { amount: '289.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1004',
            title: '44 EU (10.5 US / 28.5 см)',
            availableForSale: true,
            price: { amount: '289.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 11. Burton Photon Step On Boots
  {
    id: 'gid://shopify/Product/11',
    title: 'Burton Photon Step On Snowboard Boots',
    handle: 'burton-photon-step-on-boots',
    description: 'Революційна система Step On: забудьте про сидіння на холодному снігу для застібання ременів! Просто встаньте у кріплення Step On — три точки зчеплення (дві на носку, одна на п’яті) клацнуть і зафіксують ногу за 1 секунду. Двозонний BOA Coiler та підошва Vibram Traction Lug.',
    availableForSale: true,
    vendor: 'Burton',
    productType: 'Взуття',
    isStaffPick: true,
    rating: 5.0,
    reviewCount: 167,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
      altText: 'Burton Photon Step On Boots',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
            altText: 'Burton Step On connection cleats',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '459.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '459.00', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '510.00', currencyCode: 'USD' },
    tags: ['Взуття', 'Step On', 'BOA', 'Vibram', 'Швидке встібання'],
    specs: {
      flex: '7/10 (Жорсткий та чутливий)',
      flexRating: 7,
      profile: 'Step On Connection System + Sequence BOA',
      shape: 'Total Comfort Construction',
      terrain: 'All-Mountain / Freeride',
      level: 'Advanced – Expert',
      gender: 'men',
      subCategory: "Men's Snowboard Boots",
      origin: 'Burton Europe, Австрія',
      warranty: '3 роки офіційної гарантії Burton',
      features: ['Step On Backstay & Toe Cleats', 'Vibram Traction Lug Outsole with EcoStep Rubber', 'Imprint 3 Heat-Moldable Liner', 'Sleeping Bag Reflective Foil'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/1101',
            title: '42 EU (9.0 US / 27.0 см)',
            availableForSale: true,
            price: { amount: '459.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1102',
            title: '43 EU (10.0 US / 28.0 см)',
            availableForSale: true,
            price: { amount: '459.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1103',
            title: '44 EU (10.5 US / 28.5 см)',
            availableForSale: true,
            price: { amount: '459.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 12. Union Force Classic Bindings
  {
    id: 'gid://shopify/Product/12',
    title: 'Union Force Classic Snowboard Bindings',
    handle: 'union-force-bindings',
    description: 'Еталон надійності серед сноубордичних кріплень у всьому світі. База Stage 4 Duraflex ST витримує екстремальні морози та навантаження, стрепи Exoframe 4.0 забезпечують миттєву передачу зусилля на кант без передавлювання стопи, а магнієві баклі працюють бездоганно роками.',
    availableForSale: true,
    vendor: 'Union',
    productType: 'Кріплення',
    isStaffPick: true,
    rating: 4.9,
    reviewCount: 215,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1000&auto=format&fit=crop',
      altText: 'Union Force Snowboard Bindings',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1000&auto=format&fit=crop',
            altText: 'Union Force ratchet detail',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '249.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '249.00', currencyCode: 'USD' },
    },
    tags: ['Кріплення', 'Duraflex ST', 'Staff Pick', 'Довічна гарантія', 'All-Mountain'],
    specs: {
      flex: '7/10 (Середньо-жорсткі для будь-яких умов)',
      flexRating: 7,
      profile: 'Stage 4 Duraflex ST Baseplate',
      shape: 'Team Highback w/ Forward Lean Adjuster',
      terrain: 'All-Mountain / Freeride / Park',
      level: 'All Levels',
      gender: 'men',
      subCategory: "Men's Snowboard Bindings",
      origin: 'Італія (Union Binding Co)',
      warranty: 'Довічна гарантія на базу та п’яткову дугу',
      features: ['Multi-Density Thermoformed EVA Bushings', 'Extruded 3D Aluminum Heelcup', 'Magnesium Ratchets S1', 'Exoframe 4.0 Ankle Strap'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/1201',
            title: 'M (Розмір 40-43 EU / Black)',
            availableForSale: true,
            price: { amount: '249.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1202',
            title: 'L (Розмір 43.5-47 EU / Black)',
            availableForSale: true,
            price: { amount: '249.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1203',
            title: 'M (Розмір 40-43 EU / Ice White)',
            availableForSale: true,
            price: { amount: '249.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 13. Burton Step On Genesis Re:Flex Bindings
  {
    id: 'gid://shopify/Product/13',
    title: 'Burton Step On Genesis Re:Flex Bindings',
    handle: 'burton-step-on-genesis-bindings',
    description: 'Поєднання неперевершеного комфорту хайбека Kickback Hammock із блискавичною швидкістю системи Step On. Двокомпонентний хайбек огортає черевик та миттєво реагує на найменший нахил райдера, повністю усуваючи втому ніг під час довгих спусків.',
    availableForSale: true,
    vendor: 'Burton',
    productType: 'Кріплення',
    isStaffPick: true,
    rating: 4.9,
    reviewCount: 78,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1000&auto=format&fit=crop',
      altText: 'Burton Step On Genesis Bindings',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1000&auto=format&fit=crop',
            altText: 'Kickback hammock highback',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '389.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '389.00', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '430.00', currencyCode: 'USD' },
    tags: ['Кріплення', 'Step On', 'Genesis', 'Re:Flex', 'Kickback Hammock'],
    specs: {
      flex: '6-7/10 (Чуйний преміальний комфорт)',
      flexRating: 6.5,
      profile: 'Step On Re:Flex Disc (Сумісні з The Channel та 4x4)',
      shape: 'Kickback Hammock Highback',
      terrain: 'All-Mountain / Groomers / Powder',
      level: 'Intermediate – Expert',
      gender: 'men',
      subCategory: "Men's Snowboard Bindings",
      origin: 'Burton Europe, Австрія',
      warranty: 'Довічна гарантія на основу бази Burton',
      features: ['Step On Cleat Hooks Connection', 'Kickback Hammock Suspension', 'Re:Flex FullBED Cushioning with B3 Gel', 'Nylon Composite Blended Baseplate'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/1301',
            title: 'M (Для взуття 41.5-43.5 EU / Black)',
            availableForSale: true,
            price: { amount: '389.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1302',
            title: 'L (Для взуття 44-46 EU / Black)',
            availableForSale: true,
            price: { amount: '389.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 14. Anon M4 Toric MFI Magnetic Goggles
  {
    id: 'gid://shopify/Product/14',
    title: 'Anon M4 Toric MFI Quick-Swap Magnetic Goggles',
    handle: 'anon-m4-toric-mfi-goggles',
    description: 'Технологічний шедевр для максимального огляду в горах. Система надшвидкої магнітної зміни лінз Magna-Tech (9 потужних неодимових магнітів). У комплекті друга змінна лінза для похмурої погоди Perceive Cloudy Pink та фірмова магнітна маска для обличчя MFI Facemask.',
    availableForSale: true,
    vendor: 'Anon',
    productType: 'Оптика',
    isStaffPick: true,
    rating: 5.0,
    reviewCount: 184,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1000&auto=format&fit=crop',
      altText: 'Anon M4 Magnetic Goggles',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1000&auto=format&fit=crop',
            altText: 'Anon M4 lens reflection',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '299.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '299.00', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '340.00', currencyCode: 'USD' },
    tags: ['Оптика', 'Magna-Tech', 'Staff Pick', 'MFI Included', 'Toric Lens'],
    specs: {
      flex: 'Легка оправа з міцного поліуретану TPU',
      flexRating: 0,
      profile: 'Toric Lens (Повторює природну кривизну людського ока)',
      shape: 'OTG (Over The Glasses Сумісні з оптичними окулярами)',
      terrain: 'Будь-яка погода / Сонце / Туман / Паудер',
      level: 'Pro Rider Choice',
      gender: 'unisex',
      subCategory: "Snowboard Goggles",
      origin: 'Burton Anon, Австрія',
      warranty: '2 роки офіційної гарантії',
      features: ['Magna-Tech 9-Point Magnetic Quick Change', 'Perceive High-Contrast Color Enhancement', 'Integral Clarity Technology Anti-Fog', 'MFI Magnetic Facemask Included + Bonus Low-Light Lens'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/1401',
            title: 'Black Frame / Perceive Sunny Onyx + Bonus Amber',
            availableForSale: true,
            price: { amount: '299.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1402',
            title: 'Navy Frame / Perceive Variable Blue + Bonus Pink',
            availableForSale: true,
            price: { amount: '299.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 15. Smith Squad XL ChromaPop Goggles
  {
    id: 'gid://shopify/Product/15',
    title: 'Smith Squad XL ChromaPop Cylindrical Goggles',
    handle: 'smith-squad-xl-goggles',
    description: 'Найбільша циліндрична маска в лінійці Smith із надзвичайно широким кутом периферичного огляду. Оснащена фірмовими лінзами ChromaPop, які фільтрують перехресні світлові хвилі для створення надчіткого контрасту рельєфу снігу. В комплекті 2 оригінальні лінзи (для сонця та похмурої погоди).',
    availableForSale: true,
    vendor: 'Smith',
    productType: 'Оптика',
    isStaffPick: false,
    rating: 4.8,
    reviewCount: 92,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1000&auto=format&fit=crop',
      altText: 'Smith Squad XL Goggles',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1000&auto=format&fit=crop',
            altText: 'Smith ChromaPop lens view',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '159.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '159.00', currencyCode: 'USD' },
    },
    tags: ['Оптика', 'ChromaPop', 'XL Field of View', '2 Lenses Included', 'Smith'],
    specs: {
      flex: 'Responsive Fit frame design',
      flexRating: 0,
      profile: 'Cylindrical Carbonic-x Lens',
      shape: 'XL Semi-Rimless Design',
      terrain: 'Bright Sun / Overcast / Storm',
      level: 'All Levels',
      gender: 'unisex',
      subCategory: "Snowboard Goggles",
      origin: 'США / Smith Optics Europe',
      warranty: 'Довічна гарантія Smith Optics',
      features: ['ChromaPop Sun & Storm Lenses Included', 'Fog-X Anti-Fog Inner Lens', '3-Layer DriWix Face Foam', 'Ultra-Wide Silicone Backed Strap'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/1501',
            title: 'Black / ChromaPop Sun Green Mirror + Storm Rose Flash',
            availableForSale: true,
            price: { amount: '159.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1502',
            title: 'Slate / ChromaPop Everyday Red Mirror + Storm Yellow',
            availableForSale: true,
            price: { amount: '159.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 16. Oakley MOD3 MIPS Helmet
  {
    id: 'gid://shopify/Product/16',
    title: 'Oakley MOD3 MIPS Action Sports Helmet',
    handle: 'oakley-mod3-mips-helmet',
    description: 'Передовий захисний шолом для гірськолижного екстриму. Оснащений системою захисту мозку MIPS (Multi-directional Impact Protection System), яка нейтралізує косі та обертальні удари під час падінь на швидкості. Посадка регулюється коліщатком BOA 360 Fit System, а магнітна застібка Fidlock зручно клацає навіть у товстих рукавицях.',
    availableForSale: true,
    vendor: 'Oakley',
    productType: 'Захист',
    isStaffPick: true,
    rating: 4.9,
    reviewCount: 118,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop',
      altText: 'Oakley MOD3 MIPS Helmet',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop',
            altText: 'Oakley helmet profile view',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '169.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '169.00', currencyCode: 'USD' },
    },
    tags: ['Захист', 'MIPS', 'BOA 360', 'Fidlock', 'ASTM F2040'],
    specs: {
      flex: 'In-Mold Lightweight PC Shell + EPS Foam',
      flexRating: 0,
      profile: 'Modular Brim System (MBS)',
      shape: 'Ergonomic Round & Oval Fit',
      terrain: 'Snowboard / Ski / Downhill',
      level: 'All Levels',
      gender: 'unisex',
      subCategory: "Protective Snowboard Gear",
      origin: 'Oakley Europe (Італія)',
      warranty: 'Сертифікація ASTM F2040 та CE EN1077',
      features: ['MIPS Brain Protection System', 'BOA 360 Fit System Micro-Adjustment', 'Fidlock Magnetic Buckle', 'Removable Liner & Goggle Brim Vent'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/1601',
            title: 'S (51-55 см / Matte Black)',
            availableForSale: true,
            price: { amount: '169.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1602',
            title: 'M (55-59 см / Matte Black)',
            availableForSale: true,
            price: { amount: '169.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1603',
            title: 'L (59-63 см / Matte Black)',
            availableForSale: true,
            price: { amount: '169.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1604',
            title: 'M (55-59 см / Factory White)',
            availableForSale: true,
            price: { amount: '169.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 17. Volcom Guide GORE-TEX 3-Layer Jacket
  {
    id: 'gid://shopify/Product/17',
    title: 'Volcom Guide GORE-TEX 3-Layer Snow Jacket',
    handle: 'volcom-guide-goretex-jacket',
    description: 'Розроблена разом з гірськими гідами Baldface Lodge у Канаді. 3-шарова мембрана GORE-TEX тримає найсуворіші хуртовини та шторми сухими на 100%. Інтегрована система Zip Tech® дозволяє пристебнути куртку до будь-яких штанів Volcom, утворюючи герметичний комбінезон без шансів потрапляння снігу. Вбудована лавинна система RECCO®.',
    availableForSale: true,
    vendor: 'Volcom',
    productType: 'Одяг',
    isStaffPick: true,
    rating: 5.0,
    reviewCount: 64,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop',
      altText: 'Volcom Guide GORE-TEX Jacket',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop',
            altText: 'GORE-TEX fabric test in snow',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '599.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '599.00', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '680.00', currencyCode: 'USD' },
    tags: ['Одяг', 'GORE-TEX 3-Layer', 'Staff Pick', 'Zip Tech', 'RECCO'],
    specs: {
      flex: '3-Layer Ripstop Shell',
      flexRating: 0,
      profile: 'GORE-TEX Guaranteed to Keep You Dry® (28,000mm)',
      shape: 'Standard Guide Fit',
      terrain: 'Backcountry / Heli-Skiing / Severe Storms',
      level: 'All Riders',
      gender: 'men',
      subCategory: "Men's Snowboard Clothing",
      origin: 'США / Volcom Europe',
      warranty: 'Довічна гарантія GORE-TEX на сухість',
      features: ['GORE-TEX 3-Layer with Tricot Backer', 'Fully Taped Seams', 'Zip Tech® Jacket-to-Pant Interface', 'RECCO® Advanced Rescue Reflector', 'YKK® AquaGuard® Water Repellent Zippers'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/1701',
            title: 'M / Resin Gold',
            availableForSale: true,
            price: { amount: '599.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1702',
            title: 'L / Dark Charcoal',
            availableForSale: true,
            price: { amount: '599.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1703',
            title: 'XL / Dark Charcoal',
            availableForSale: true,
            price: { amount: '599.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 18. Montec Doom 20K Waterproof Anorak
  {
    id: 'gid://shopify/Product/18',
    title: 'Montec Doom 20K Waterproof Snow Anorak',
    handle: 'montec-doom-20k-snow-anorak',
    description: 'Флагманський сноубордичний анорак із мембраною Shield-TEC 20,000mm/20,000g. Повністю проклеєні шви, водовідштовхувальне покриття Teflon EcoElite DWR, снігозахисна спідниця, бічна блискавка для легкого одягання, вентиляція під пахвами та тепла підкладка.',
    availableForSale: true,
    vendor: 'Montec',
    productType: 'Одяг',
    isStaffPick: false,
    rating: 4.9,
    reviewCount: 147,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop',
      altText: 'Montec Doom Snow Anorak',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop',
            altText: 'Anorak details',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '239.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '239.00', currencyCode: 'USD' },
    },
    tags: ['Одяг', '20K Мембрана', 'Анорак', 'Водозахист', 'Топ стиль'],
    specs: {
      flex: '2-Way Stretch Membrane',
      flexRating: 0,
      profile: '20,000 mm Водонепроникність / 20,000 g Дихання',
      shape: 'Relaxed Anorak Fit',
      terrain: 'Powder / Resort / Snowstorm',
      level: 'All Riders',
      gender: 'unisex',
      subCategory: "Men's Snowboard Clothing",
      origin: 'Швеція / Montecwear ЄС',
      warranty: '2 роки офіційної гарантії',
      features: ['20K/20K Shield-TEC Мембрана', 'Вологозахищені блискавки YKK Aquaguard', 'Кишеня для скіпасу на рукаві', 'Анатомічний капюшон під шолом'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/1801',
            title: 'S / All Black',
            availableForSale: true,
            price: { amount: '239.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1802',
            title: 'M / Black & Olive Green',
            availableForSale: true,
            price: { amount: '239.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1803',
            title: 'L / Arctic Camo',
            availableForSale: true,
            price: { amount: '239.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 19. Santa Cruz Classic Dot 8.0" Skateboard
  {
    id: 'gid://shopify/Product/19',
    title: 'Santa Cruz Classic Dot Complete Skateboard 8.0"',
    handle: 'santa-cruz-classic-dot-skateboard',
    description: 'Оригінальний зібраний компліт від культового каліфорнійського бренду Santa Cruz. 7 шарів 100% північноамериканського клена з епоксидним склеюванням. Траки Bullet 130mm, колеса OJ Wheels 52mm 95a та швидкісні підшипники ABEC-5.',
    availableForSale: true,
    vendor: 'Santa Cruz',
    productType: 'Скейтборди',
    isStaffPick: true,
    rating: 4.9,
    reviewCount: 89,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?q=80&w=1000&auto=format&fit=crop',
      altText: 'Santa Cruz Classic Dot Complete Skateboard',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?q=80&w=1000&auto=format&fit=crop',
            altText: 'Santa Cruz deck graphic',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '119.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '129.00', currencyCode: 'USD' },
    },
    tags: ['Скейтборди', '7-ply Maple', 'Staff Pick', 'Стріт & Парк', 'Компліт'],
    specs: {
      flex: '9/10 (Жорстка дека для вибухового клацання)',
      flexRating: 9,
      profile: 'Medium Concave',
      shape: 'Popsicle Deck 8.0" x 31.6"',
      terrain: 'Street / Skatepark / Bowl',
      level: 'Beginner – Pro',
      gender: 'unisex',
      subCategory: 'Skateboards',
      origin: 'США / Каліфорнія (Склад ЄС)',
      warranty: '100% оригінальний компліт Santa Cruz',
      features: ['7-Ply North American Maple', 'Bullet 130mm Lightweight Trucks', 'OJ 52mm 95a Urethane Wheels', 'High Speed ABEC-5 Bearings'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/1901',
            title: '8.0" x 31.6" (Універсал стріт/парк)',
            availableForSale: true,
            price: { amount: '119.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/1902',
            title: '8.25" x 31.8" (Для великого взуття та рампи)',
            availableForSale: true,
            price: { amount: '129.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },

  // 20. Dakine Deluxe Snowboard Tune & Wax Kit
  {
    id: 'gid://shopify/Product/20',
    title: 'Dakine Deluxe Snowboard Tuning & Waxing Kit',
    handle: 'dakine-deluxe-tune-kit',
    description: 'Професійний набір для повного сервісу сноубордів та гірських лиж від культового бренду Dakine. Включає регульовану праску для парафіну (110-240V), всепогодний парафін Nitrous All-Temp, канторіз для заточки під кутом 88°/90°, металевий та пластиковий скребки, латунну й нейлонову щітки, палички P-Tex для ремонту подряпин бази та компактний кейс.',
    availableForSale: true,
    vendor: 'Dakine',
    productType: 'Аксесуари',
    isStaffPick: true,
    rating: 4.9,
    reviewCount: 76,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1000&auto=format&fit=crop',
      altText: 'Dakine Deluxe Tune Kit',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1000&auto=format&fit=crop',
            altText: 'Tuning iron and wax accessories',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '89.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '89.00', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '105.00', currencyCode: 'USD' },
    tags: ['Аксесуари', 'Догляд за бордом', 'Парафін', 'Канторіз', 'P-Tex Ремонт'],
    specs: {
      flex: 'Професійний інструмент для майстерні',
      flexRating: 0,
      profile: 'Complete Snowboard Tuning Case',
      shape: 'Захисний чохол на блискавці',
      terrain: 'Resort & Home Service',
      level: 'Для всіх райдерів',
      gender: 'unisex',
      subCategory: 'Snowboarding Accessories',
      origin: 'США / Dakine Europe',
      warranty: 'Офіційна гарантія Dakine 2 роки',
      features: ['Adjustable Temperature Wax Iron', 'Edge Tuning Tool (88° and 90°)', 'Nitrous All-Temp Wax (110g)', 'Clear & Black P-Tex Sticks', 'Brass & Horsehair Buffing Brushes'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/2001',
            title: 'Deluxe Tuning Edition (Повний набір)',
            availableForSale: true,
            price: { amount: '89.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
];

export const TACTICS_BRANDS = [
  'Burton',
  'Capita',
  'Lib Tech',
  'Union',
  'ThirtyTwo',
  'Salomon',
  'GNU',
  'Nitro',
  'Jones',
  'Bataleon',
  'Anon',
  'Smith',
  'Oakley',
  'Volcom',
  'Montec',
  'Vans',
  'Santa Cruz',
  'Dakine',
];

export const FALLBACK_COLLECTIONS: ShopifyCollection[] = [
  { id: 'all', title: 'Все спорядження', handle: 'all' },
  { id: 'Сноуборди', title: 'Сноуборди', handle: 'snowboards' },
  { id: 'Взуття', title: 'Черевики (Boots)', handle: 'boots' },
  { id: 'Кріплення', title: 'Кріплення (Bindings)', handle: 'bindings' },
  { id: 'Оптика', title: 'Оптика & Маски', handle: 'optics' },
  { id: 'Захист', title: 'Шоломи & Захист', handle: 'helmets' },
  { id: 'Одяг', title: 'Куртки & Одяг', handle: 'apparel' },
  { id: 'Скейтборди', title: 'Скейтборди', handle: 'skate' },
  { id: 'Аксесуари', title: 'Догляд & Сервіс', handle: 'accessories' },
];

export interface ShopifyCredentials {
  domain?: string;
  storefrontToken?: string;
}

export async function shopifyFetch<T>({
  query,
  variables = {},
  credentials,
}: {
  query: string;
  variables?: Record<string, unknown>;
  credentials?: ShopifyCredentials;
}): Promise<T | null> {
  const domain = credentials?.domain || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = credentials?.storefrontToken || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  let endpoint = 'https://mock.shop/api';
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (domain && token) {
    endpoint = `https://${domain.replace(/^https?:\/\//, '').replace(/\/$/, '')}/api/2024-01/graphql.json`;
    headers['X-Shopify-Storefront-Access-Token'] = token;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`Shopify API responded with status ${res.status}`);
      return null;
    }

    const json = await res.json();
    if (json.errors) {
      console.warn('Shopify GraphQL errors:', json.errors);
      return null;
    }

    return json.data as T;
  } catch (error) {
    console.warn('Shopify fetch network error, using fallback:', error);
    return null;
  }
}

export async function getShopifyProducts(credentials?: ShopifyCredentials): Promise<ShopifyProduct[]> {
  const query = `
    query getProducts {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            availableForSale
            featuredImage {
              id
              url
              altText
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    products: {
      edges: { node: ShopifyProduct }[];
    };
  }>({ query, credentials });

  if (data?.products?.edges && data.products.edges.length > 0) {
    return data.products.edges.map((edge) => edge.node);
  }

  return FALLBACK_PRODUCTS;
}

export async function getProductByHandle(handle: string, credentials?: ShopifyCredentials): Promise<ShopifyProduct | null> {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        availableForSale
        vendor
        productType
        tags
        featuredImage {
          id
          url
          altText
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query,
    variables: { handle },
    credentials,
  });

  if (data?.product) {
    return data.product;
  }

  // Fallback match
  const found = FALLBACK_PRODUCTS.find((p) => p.handle === handle);
  return found || null;
}

export async function getRelatedProducts(currentHandle: string, credentials?: ShopifyCredentials): Promise<ShopifyProduct[]> {
  const all = await getShopifyProducts(credentials);
  return all.filter((p) => p.handle !== currentHandle).slice(0, 4);
}
