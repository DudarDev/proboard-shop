import { ShopifyProduct, ShopifyCollection } from '@/types/shopify';

export const FALLBACK_PRODUCTS: ShopifyProduct[] = [
  {
    id: 'gid://shopify/Product/1',
    title: 'Nitro Team Pro All-Mountain Camber Snowboard',
    handle: 'nitro-team-pro-snowboard',
    description: 'Легендарний заряджений сноуборд від Nitro, створений для райдерів, які шукають вибуховий поп, впевнене тримання канта на крижаних схилах та стабільність на шалених швидкостях. Класичний прогин Trüe Camber, сердечник Powerlite Core та надшвидка спечена база Sintered Speed Formula II.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1522056615691-da7b810682b5?q=80&w=1000&auto=format&fit=crop',
      altText: 'Nitro Team Pro Snowboard',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1522056615691-da7b810682b5?q=80&w=1000&auto=format&fit=crop',
            altText: 'Nitro Team Pro rider action',
          },
        },
        {
          node: {
            url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1000&auto=format&fit=crop',
            altText: 'Snowboard profile in snow',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '499.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '519.00', currencyCode: 'USD' },
    },
    tags: ['Сноуборди', 'Хіт сезону', 'Camber', 'Топ вибір', 'Pro Series'],
    productType: 'Сноуборди',
    vendor: 'Nitro Snowboards',
    specs: {
      flex: '8/10 (Жорсткий, вибуховий контроль)',
      profile: 'Trüe Camber (Класичний кембер)',
      shape: 'Directional Twin',
      terrain: 'All-Mountain / Big Air / Carving',
      level: 'Advanced – Pro',
      origin: 'Австрія (Оригінал, склад Європа)',
      warranty: '2 роки офіційної гарантії від Nitro',
      waistWidth: '250 мм (155), 252 мм (157), 264 мм (159W)',
      features: ['Powerlite Core', 'Bi-Lite Laminates', 'Diamond Band Carbon', 'Sintered Speed Formula II Base'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/101',
            title: '155 см (Вага 55-75 кг)',
            availableForSale: true,
            price: { amount: '499.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/102',
            title: '157 см (Вага 65-85 кг)',
            availableForSale: true,
            price: { amount: '499.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/103',
            title: '159 см WIDE (Для взуття 44+ EU)',
            availableForSale: true,
            price: { amount: '519.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/104',
            title: '162 см WIDE (Вага 80+ кг, взуття 44+)',
            availableForSale: true,
            price: { amount: '519.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/2',
    title: 'Burton Custom Flying V Hybrid Snowboard',
    handle: 'burton-custom-flying-v-snowboard',
    description: 'Найвідоміша модель у світі сноубордингу. Гібридний прогин Flying V поєднує грайливість і плавучість рокера між закладними із чіпкістю кембера під ногами. Ідеальний баланс для фрірайду в глибокому пухляку та комфортного катання по курорту.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1000&auto=format&fit=crop',
      altText: 'Burton Custom Flying V Snowboard',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1000&auto=format&fit=crop',
            altText: 'Burton Custom board top',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '549.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '569.00', currencyCode: 'USD' },
    },
    tags: ['Сноуборди', 'Flying V', 'Легенда', 'Пухляк'],
    productType: 'Сноуборди',
    vendor: 'Burton Snowboards',
    specs: {
      flex: '6/10 (Універсальна середня жорсткість)',
      profile: 'Flying V (Rocker/Camber Hybrid)',
      shape: 'Directional Shape',
      terrain: 'All-Mountain / Powder / Groomers',
      level: 'Intermediate – Advanced',
      origin: 'Австрія (Офіційний Burton Європа)',
      warranty: '3 роки фірмової гарантії Burton WMS',
      waistWidth: '250 мм (154), 254 мм (158), 262 мм (158W)',
      features: ['Super Fly II 700G Core', '45° Carbon Highlights', 'WFO Sintered Base', 'The Channel Binding System'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/201',
            title: '154 см',
            availableForSale: true,
            price: { amount: '549.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/202',
            title: '156 см',
            availableForSale: true,
            price: { amount: '549.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/203',
            title: '158 см',
            availableForSale: true,
            price: { amount: '549.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/204',
            title: '160 см WIDE (Для взуття 44+ EU)',
            availableForSale: true,
            price: { amount: '569.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/3',
    title: 'Capita Defenders of Awesome (DOA) Snowboard',
    handle: 'capita-doa-snowboard',
    description: 'Семиразовий володар премії Transworld Good Wood Award. Головний бестселер бренду Capita з австрійської еко-фабрики The Mothership. Прогин Resort V1 Camber дає передбачуваний виліт з кікерів та неймовірну чутливість у парку.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=1000&auto=format&fit=crop',
      altText: 'Capita DOA Snowboard',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=1000&auto=format&fit=crop',
            altText: 'Capita DOA in action',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '479.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '499.00', currencyCode: 'USD' },
    },
    tags: ['Сноуборди', 'DOA', 'Парк & Фрістайл', 'Хіт'],
    productType: 'Сноуборди',
    vendor: 'Capita',
    specs: {
      flex: '5.5/10 (Чуйний всесезонний фрістайл)',
      profile: 'Resort V1 Camber (Zero Camber + Rocker Tips)',
      shape: 'True Twin (Повна симетрія)',
      terrain: 'Resort / Freestyle / Park',
      level: 'Intermediate – Pro',
      origin: 'The Mothership, Австрія',
      warranty: '2 роки офіційної гарантії',
      waistWidth: '248 мм (152), 250 мм (154), 252 мм (156)',
      features: ['Dual Blaster Ashpop Core', 'Fortress Aramid Bound Sidewalls', 'Quantum Drive Sintered Base', 'Holysheet Fiberglass'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/301',
            title: '152 см',
            availableForSale: true,
            price: { amount: '479.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/302',
            title: '154 см',
            availableForSale: true,
            price: { amount: '479.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/303',
            title: '156 см',
            availableForSale: true,
            price: { amount: '479.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/304',
            title: '158 см WIDE (Для взуття 44+ EU)',
            availableForSale: true,
            price: { amount: '499.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/4',
    title: 'Union Force Classic Snowboard Bindings',
    handle: 'union-force-bindings',
    description: 'Еталон надійності серед сноубордичних кріплень. База Stage 4 Duraflex ST витримує екстремальні морози та навантаження, стрепи Exoframe 4.0 забезпечують миттєву передачу зусилля на кант без передавлювання стопи.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1000&auto=format&fit=crop',
      altText: 'Union Force Bindings',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1000&auto=format&fit=crop',
            altText: 'Bindings details',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '229.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '229.00', currencyCode: 'USD' },
    },
    tags: ['Кріплення', 'Duraflex', 'Надійність', 'Топ вибір'],
    productType: 'Кріплення',
    vendor: 'Union Binding Company',
    specs: {
      flex: '7/10 (Середньо-жорсткі)',
      profile: 'Stage 4 Duraflex ST Baseplate',
      shape: 'Team Highback w/ Forward Lean Adjuster',
      terrain: 'All-Mountain / Freeride',
      level: 'All Levels',
      origin: 'Італія (Union Binding Co, ЄС)',
      warranty: 'Довічна гарантія на базу та п’яткову дугу',
      features: ['Multi-Density Thermoformed EVA', 'Extruded 3D Aluminum Heelcup', 'Magnesium Ratchets', 'Grade 8.8 Steel Hardware'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/401',
            title: 'M (Розмір 40-43 EU / Black)',
            availableForSale: true,
            price: { amount: '229.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/402',
            title: 'L (Розмір 43.5-47 EU / Black)',
            availableForSale: true,
            price: { amount: '229.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/403',
            title: 'M (Розмір 40-43 EU / Ice White)',
            availableForSale: true,
            price: { amount: '229.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/5',
    title: 'ThirtyTwo Lashed Double BOA Snowboard Boots',
    handle: 'thirtytwo-lashed-double-boa-boots',
    description: 'Найпопулярніші сноубордичні черевики у світі з двозонною системою шнурівки Dual BOA. Дозволяє окремо налаштувати фіксацію стопи та гомілки за 3 секунди. Термоформований внутрішник Team Fit з індивідуальною посадкою під вашу ногу.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
      altText: 'ThirtyTwo Lashed Double BOA Boots',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
            altText: 'Snowboard boots',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '299.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '299.00', currencyCode: 'USD' },
    },
    tags: ['Черевики', 'Double BOA', 'Термоформовка', 'Комфорт'],
    productType: 'Кріплення',
    vendor: 'ThirtyTwo',
    specs: {
      flex: '6/10 (Збалансована універсальна жорсткість)',
      profile: 'Dual BOA Coiler System w/ TX3 Lace',
      shape: '1:1 Lasting Ergonomic Shell',
      terrain: 'All-Mountain / Park / Freestyle',
      level: 'Intermediate – Advanced',
      origin: 'Нідерланди / Склад ЄС',
      warranty: '2 роки офіційної гарантії',
      features: ['Team Fit Heat-Moldable Intuition Foam', 'Performance Rubber Outsole', 'Evolution Foam Cushioning', 'Articulated Cuff'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/501',
            title: '41 EU (8.5 US / 26.5 см)',
            availableForSale: true,
            price: { amount: '299.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/502',
            title: '42 EU (9.0 US / 27.0 см)',
            availableForSale: true,
            price: { amount: '299.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/503',
            title: '43 EU (10.0 US / 28.0 см)',
            availableForSale: true,
            price: { amount: '299.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/504',
            title: '44 EU (10.5 US / 28.5 см)',
            availableForSale: true,
            price: { amount: '299.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/505',
            title: '45 EU (11.5 US / 29.5 см)',
            availableForSale: true,
            price: { amount: '299.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/6',
    title: 'Santa Cruz Classic Dot Complete Skateboard 8.0"',
    handle: 'santa-cruz-classic-dot-skateboard',
    description: 'Повністю зібраний оригінальний компліт від культового каліфорнійського бренду Santa Cruz. 7 шарів 100% північноамериканського клена з епоксидним пресуванням. Траки Bullet 130mm, колеса OJ Wheels 52mm 95a та високоточні підшипники ABEC-5.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?q=80&w=1000&auto=format&fit=crop',
      altText: 'Santa Cruz Complete Skateboard',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?q=80&w=1000&auto=format&fit=crop',
            altText: 'Skateboard top and bottom view',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '119.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '125.00', currencyCode: 'USD' },
    },
    tags: ['Скейтборди', '7-ply Канадський клен', 'Стріт', 'Компліт'],
    productType: 'Скейтборди',
    vendor: 'Santa Cruz Skateboards',
    specs: {
      flex: '9/10 (Жорстка дека для вибухового клацання)',
      profile: 'Medium Concave',
      shape: 'Popsicle Deck 8.0" x 31.6"',
      terrain: 'Street / Skatepark / Bowl',
      level: 'Beginner – Pro',
      origin: 'США / Каліфорнія (Склад ЄС)',
      warranty: '100% оригінальний компліт Santa Cruz',
      features: ['7-Ply North American Maple', 'Bullet 130mm Lightweight Trucks', 'OJ 52mm 95a Urethane Wheels', 'High Speed ABEC-5 Bearings'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/601',
            title: '8.0" x 31.6" (Універсал стріт/парк)',
            availableForSale: true,
            price: { amount: '119.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/602',
            title: '8.25" x 31.8" (Для великого взуття та рампи)',
            availableForSale: true,
            price: { amount: '125.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/7',
    title: 'Anon M4 Toric MFI Quick-Swap Magnetic Goggles',
    handle: 'anon-m4-toric-mfi-goggles',
    description: 'Технологічний шедевр для максимального огляду в горах. Система надшвидкої магнітної зміни лінз Magna-Tech (9 потужних неодимових магнітів). У комплекті друга змінна лінза для похмурої погоди та магнітна маска для обличчя MFI.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1000&auto=format&fit=crop',
      altText: 'Anon M4 Magnetic Goggles',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1000&auto=format&fit=crop',
            altText: 'Goggles in snow reflection',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '269.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '269.00', currencyCode: 'USD' },
    },
    tags: ['Оптика', 'Magna-Tech', 'Магнітна зміна', 'UV400', 'MFI'],
    productType: 'Оптика',
    vendor: 'Anon Optics',
    specs: {
      flex: 'Легка оправа з поліуретану TPU',
      profile: 'Toric Lens (Повторює природну кривизну ока)',
      shape: 'Over The Glasses (OTG) Сумісна з окулярами',
      terrain: 'Будь-яка погода / Сонце / Туман',
      level: 'Pro Rider Choice',
      origin: 'Burton Anon, Австрія',
      warranty: '2 роки офіційної гарантії',
      features: ['Magna-Tech Quick Lens Change', 'Perceive Optics High-Contrast Lens', 'ICT Anti-Fog Treatment', 'MFI Magnetic Facemask Included'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/701',
            title: 'Black Frame / Perceive Sunny Onyx + Amber Cloud',
            availableForSale: true,
            price: { amount: '269.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/702',
            title: 'Navy Frame / Perceive Variable Blue + Cloudy Pink',
            availableForSale: true,
            price: { amount: '269.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/8',
    title: 'Oakley MOD3 MIPS Action Sports Helmet',
    handle: 'oakley-mod3-mips-helmet',
    description: 'Передовий захисний шолом для зимового екстриму. Обладнаний системою захисту мозку MIPS, яка поглинає косі та обертальні удари. Інтегрована вентиляція запобігає запотіванню маски, а посадка регулюється коліщатком BOA 360 Fit System.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop',
      altText: 'Oakley MOD3 MIPS Helmet',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop',
            altText: 'Helmet profile view',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '149.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '149.00', currencyCode: 'USD' },
    },
    tags: ['Захист', 'MIPS', 'Шолом', 'Сертифікований', 'BOA'],
    productType: 'Захист',
    vendor: 'Oakley',
    specs: {
      flex: 'In-Mold Construction + MIPS система',
      profile: 'Modular Brim System (Сумісний з будь-якою маскою)',
      shape: 'Ergonomic 360 Fit System',
      terrain: 'Snowboard / Ski / Downhill',
      level: 'All Levels',
      origin: 'Oakley Europe',
      warranty: 'Сертифікація ASTM F2040 та CE EN1077',
      features: ['MIPS Brain Protection System', 'BOA 360 Fit System', 'Fidlock Magnetic Buckle (зручно в рукавицях)', 'Removable Liner & Ear Pads'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/801',
            title: 'S (51-55 см / Matte Black)',
            availableForSale: true,
            price: { amount: '149.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/802',
            title: 'M (55-59 см / Matte Black)',
            availableForSale: true,
            price: { amount: '149.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/803',
            title: 'L (59-63 см / Matte Black)',
            availableForSale: true,
            price: { amount: '149.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/804',
            title: 'M (55-59 см / Factory White)',
            availableForSale: true,
            price: { amount: '149.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/9',
    title: 'Montec Doom 20K Waterproof Snow Anorak',
    handle: 'montec-doom-20k-snow-anorak',
    description: 'Флагманський сноубордичний анорак із топовою мембраною Shield-TEC 20,000mm/20,000g. Повністю проклеєні шви, водовідштовхувальне покриття Teflon EcoElite DWR, снігозахисна спідниця, вентиляція під пахвами та тепла підкладка.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop',
      altText: 'Montec Doom Snow Anorak',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop',
            altText: 'Anorak in outdoor mountain setting',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '239.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '239.00', currencyCode: 'USD' },
    },
    tags: ['Одяг', '20K Мембрана', 'Анорак', 'Водозахист', 'Топ стиль'],
    productType: 'Одяг',
    vendor: 'Montec Wear',
    specs: {
      flex: '2-Way Stretch Membrane',
      profile: '20,000 mm Водонепроникність / 20,000 g Дихання',
      shape: 'Relaxed Anorak Fit',
      terrain: 'Powder / Resort / Snowstorm',
      level: 'All Riders',
      origin: 'Швеція / Montecwear ЄС',
      warranty: '2 роки офіційної гарантії',
      features: ['20K/20K Shield-TEC Мембрана', 'Вологозахищені блискавки YKK Aquaguard', 'Кишеня для скіпасу на рукаві', 'Анатомічний капюшон під шолом'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/901',
            title: 'S / All Black',
            availableForSale: true,
            price: { amount: '239.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/902',
            title: 'M / Black & Olive Green',
            availableForSale: true,
            price: { amount: '239.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/903',
            title: 'L / Arctic Camo',
            availableForSale: true,
            price: { amount: '239.00', currencyCode: 'USD' },
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/904',
            title: 'XL / All Black',
            availableForSale: true,
            price: { amount: '239.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/10',
    title: 'Proboard Workshop Tuning & Waxing Maintenance Kit',
    handle: 'proboard-tuning-wax-kit',
    description: 'Повний набір для самостійної підготовки, парафінення та заточування кантів сноуборду або лиж. Включає фірмову праску з точним терморегулятором, універсальний всепогодний парафін, регульований канторіз (88-90°), скребок з плексигласу та щітку.',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1000&auto=format&fit=crop',
      altText: 'Proboard Maintenance Kit',
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1000&auto=format&fit=crop',
            altText: 'Wax iron and maintenance tools',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '69.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '69.00', currencyCode: 'USD' },
    },
    tags: ['Аксесуари', 'Догляд за бордом', 'Парафін', 'Канторіз'],
    productType: 'Аксесуари',
    vendor: 'Proboard Care',
    specs: {
      flex: 'Професійний інструмент для сервісу',
      profile: 'Full Service Maintenance Kit',
      shape: 'Компактний кейс для подорожей',
      terrain: 'Resort & Home Service',
      level: 'Для всіх райдерів',
      origin: 'Німеччина (Склад Proboard)',
      warranty: 'Офіційна якість Proboard Service',
      features: ['Електрична праска з регулятором 100-160°C', 'Всепогодний гідрокарбоновий парафін 120г', 'Канторіз з напилком', 'Латунна та нейлонова щітки'],
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/1001',
            title: 'Complete Workshop Edition (Повний комплект)',
            availableForSale: true,
            price: { amount: '69.00', currencyCode: 'USD' },
          },
        },
      ],
    },
  },
];

export const FALLBACK_COLLECTIONS: ShopifyCollection[] = [
  { id: 'all', title: 'Все спорядження', handle: 'all' },
  { id: 'Сноуборди', title: 'Сноуборди', handle: 'snowboards' },
  { id: 'Скейтборди', title: 'Скейтборди', handle: 'skateboards' },
  { id: 'Кріплення', title: 'Кріплення & Взуття', handle: 'bindings-boots' },
  { id: 'Оптика', title: 'Оптика & Маски', handle: 'optics' },
  { id: 'Захист', title: 'Шоломи & Захист', handle: 'protection' },
  { id: 'Одяг', title: 'Анораки & Одяг', handle: 'apparel' },
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
  return all.filter((p) => p.handle !== currentHandle).slice(0, 3);
}

