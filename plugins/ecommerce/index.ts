import { Plugin } from '@/types/plugin'

export const ecommercePlugin: Plugin = {
  metadata: {
    id: 'ecommerce',
    name: 'E-commerce',
    version: '1.0.0',
    author: 'CMS Team',
    description: 'Toko online lengkap dengan produk, keranjang belanja, pesanan, dan integrasi pembayaran',
    category: 'ecommerce',
    icon: 'ShoppingCart',
    license: 'MIT',
  },

  settings: {
    storeName: '',
    currency: 'IDR',
    taxRate: 0,
    shippingEnabled: true,
    paymentGateways: {
      midtrans: {
        enabled: false,
        serverKey: '',
        clientKey: '',
      },
      xendit: {
        enabled: false,
        apiKey: '',
      },
    },
    inventoryTracking: true,
    lowStockThreshold: 10,
  },

  routes: [
    {
      path: '/admin/shop/dashboard',
      component: 'shop-dashboard',
      title: 'Shop Dashboard',
      icon: 'LayoutDashboard',
      adminOnly: true,
    },
    {
      path: '/admin/shop/products',
      component: 'product-list',
      title: 'Products',
      icon: 'Package',
      adminOnly: true,
    },
    {
      path: '/admin/shop/categories',
      component: 'product-category-list',
      title: 'Categories',
      icon: 'FolderOpen',
      adminOnly: true,
    },
    {
      path: '/admin/shop/orders',
      component: 'order-list',
      title: 'Orders',
      icon: 'ShoppingBag',
      adminOnly: true,
    },
    {
      path: '/admin/shop/customers',
      component: 'customer-list',
      title: 'Customers',
      icon: 'Users',
      adminOnly: true,
    },
    {
      path: '/admin/shop/payments',
      component: 'payment-list',
      title: 'Payments',
      icon: 'CreditCard',
      adminOnly: true,
    },
    {
      path: '/admin/shop/shipping',
      component: 'shipping-settings',
      title: 'Shipping',
      icon: 'Truck',
      adminOnly: true,
    },
    {
      path: '/shop',
      component: 'shop-front',
      title: 'Shop',
      icon: 'Store',
      adminOnly: false,
    },
  ],

  database: {
    tables: [
      {
        name: 'shop_products',
        schema: `
          CREATE TABLE shop_products (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR(200) NOT NULL,
            slug VARCHAR(200) UNIQUE NOT NULL,
            description TEXT,
            price DECIMAL(12,2) NOT NULL,
            compare_price DECIMAL(12,2),
            cost_price DECIMAL(12,2),
            sku VARCHAR(100) UNIQUE,
            barcode VARCHAR(100),
            track_inventory BOOLEAN DEFAULT true,
            stock_quantity INTEGER DEFAULT 0,
            low_stock_threshold INTEGER DEFAULT 10,
            category_id UUID,
            brand VARCHAR(100),
            weight DECIMAL(8,2),
            dimensions JSONB,
            images JSONB,
            status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
            featured BOOLEAN DEFAULT false,
            seo_title VARCHAR(200),
            seo_description TEXT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
      {
        name: 'shop_product_categories',
        schema: `
          CREATE TABLE shop_product_categories (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR(100) NOT NULL,
            slug VARCHAR(100) UNIQUE NOT NULL,
            description TEXT,
            parent_id UUID REFERENCES shop_product_categories(id),
            image_url TEXT,
            display_order INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
      {
        name: 'shop_customers',
        schema: `
          CREATE TABLE shop_customers (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES profiles(id),
            email VARCHAR(100) NOT NULL,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            phone VARCHAR(50),
            billing_address JSONB,
            shipping_address JSONB,
            notes TEXT,
            total_spent DECIMAL(12,2) DEFAULT 0,
            order_count INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
      {
        name: 'shop_orders',
        schema: `
          CREATE TABLE shop_orders (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            order_number VARCHAR(50) UNIQUE NOT NULL,
            customer_id UUID REFERENCES shop_customers(id),
            status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
            payment_status VARCHAR(50) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'partially_paid', 'refunded')),
            subtotal DECIMAL(12,2) NOT NULL,
            tax DECIMAL(12,2) DEFAULT 0,
            shipping_cost DECIMAL(12,2) DEFAULT 0,
            discount DECIMAL(12,2) DEFAULT 0,
            total DECIMAL(12,2) NOT NULL,
            currency VARCHAR(10) DEFAULT 'IDR',
            billing_address JSONB,
            shipping_address JSONB,
            shipping_method VARCHAR(100),
            tracking_number VARCHAR(100),
            notes TEXT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
      {
        name: 'shop_order_items',
        schema: `
          CREATE TABLE shop_order_items (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            order_id UUID REFERENCES shop_orders(id) ON DELETE CASCADE,
            product_id UUID REFERENCES shop_products(id),
            product_name VARCHAR(200) NOT NULL,
            product_sku VARCHAR(100),
            quantity INTEGER NOT NULL,
            price DECIMAL(12,2) NOT NULL,
            total DECIMAL(12,2) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
      {
        name: 'shop_payments',
        schema: `
          CREATE TABLE shop_payments (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            order_id UUID REFERENCES shop_orders(id),
            payment_method VARCHAR(50) NOT NULL,
            payment_gateway VARCHAR(50),
            transaction_id VARCHAR(200) UNIQUE,
            amount DECIMAL(12,2) NOT NULL,
            currency VARCHAR(10) DEFAULT 'IDR',
            status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
            metadata JSONB,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
      {
        name: 'shop_cart',
        schema: `
          CREATE TABLE shop_cart (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES profiles(id),
            session_id VARCHAR(100),
            product_id UUID REFERENCES shop_products(id),
            quantity INTEGER NOT NULL DEFAULT 1,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
      {
        name: 'shop_reviews',
        schema: `
          CREATE TABLE shop_reviews (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            product_id UUID REFERENCES shop_products(id) ON DELETE CASCADE,
            user_id UUID REFERENCES profiles(id),
            rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
            title VARCHAR(200),
            review TEXT,
            verified_purchase BOOLEAN DEFAULT false,
            helpful_count INTEGER DEFAULT 0,
            status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `,
      },
    ],
  },

  async onActivate() {
    console.log('E-commerce plugin activated')
    // Initialize payment gateways
    // Create default product categories
  },

  async onDeactivate() {
    console.log('E-commerce plugin deactivated')
  },

  async onUninstall() {
    console.log('E-commerce plugin uninstalled')
    // Archive orders and products
  },
}
