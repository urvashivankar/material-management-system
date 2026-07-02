const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto')

const prisma = new PrismaClient()

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex')
  return `${salt}:${hash}`
}

async function main() {
  try {
    // Delete existing data
    await prisma.payment.deleteMany()
    await prisma.expense.deleteMany()
    await prisma.dieselEntry.deleteMany()
    await prisma.sale.deleteMany()
    await prisma.purchase.deleteMany()
    await prisma.driver.deleteMany()
    await prisma.vehicle.deleteMany()
    await prisma.customer.deleteMany()
    await prisma.supplier.deleteMany()
    await prisma.material.deleteMany()
    await prisma.admin.deleteMany()

    // Create admin user
    await prisma.admin.create({
      data: {
        email: 'admin@example.com',
        password: hashPassword('admin123'),
        name: 'Admin User',
      },
    })

    // Create sample materials with more variety
    await prisma.material.createMany({
      data: [
        {
          code: 'CEMENT-001',
          name: 'Portland Cement 50kg',
          category: 'Cement',
          unit: 'Bag',
          quantity: 800,
          minStock: 100,
          unitPrice: 380,
          description: 'High quality Portland cement 50kg bags - Grade 53',
        },
        {
          code: 'CEMENT-002',
          name: 'White Cement Premium',
          category: 'Cement',
          unit: 'Bag',
          quantity: 350,
          minStock: 50,
          unitPrice: 520,
          description: 'Premium white cement for decorative applications',
        },
        {
          code: 'SAND-001',
          name: 'River Sand Grade A',
          category: 'Sand & Aggregate',
          unit: 'Ton',
          quantity: 150,
          minStock: 20,
          unitPrice: 850,
          description: 'Clean river sand for construction and masonry',
        },
        {
          code: 'SAND-002',
          name: 'Fine Concrete Sand',
          category: 'Sand & Aggregate',
          unit: 'Ton',
          quantity: 200,
          minStock: 30,
          unitPrice: 750,
          description: 'Fine sand for concrete mixing',
        },
        {
          code: 'STEEL-001',
          name: 'TMT Steel Bars 16mm',
          category: 'Steel',
          unit: 'Ton',
          quantity: 75,
          minStock: 10,
          unitPrice: 52000,
          description: 'Thermomechanical Treated steel bars 16mm diameter',
        },
        {
          code: 'STEEL-002',
          name: 'TMT Steel Bars 12mm',
          category: 'Steel',
          unit: 'Ton',
          quantity: 120,
          minStock: 15,
          unitPrice: 46000,
          description: 'TMT steel bars 12mm diameter for reinforcement',
        },
        {
          code: 'BRICK-001',
          name: 'Red Clay Bricks',
          category: 'Bricks',
          unit: 'Thousand',
          quantity: 250,
          minStock: 50,
          unitPrice: 4500,
          description: 'Standard red clay bricks per thousand',
        },
        {
          code: 'BRICK-002',
          name: 'Fly Ash Bricks',
          category: 'Bricks',
          unit: 'Thousand',
          quantity: 180,
          minStock: 30,
          unitPrice: 3200,
          description: 'Eco-friendly fly ash bricks',
        },
        {
          code: 'TILE-001',
          name: 'Ceramic Floor Tiles',
          category: 'Tiles',
          unit: 'Box',
          quantity: 500,
          minStock: 100,
          unitPrice: 450,
          description: 'High quality ceramic floor tiles 60x60cm',
        },
        {
          code: 'TILE-002',
          name: 'Granite Tiles',
          category: 'Tiles',
          unit: 'Box',
          quantity: 300,
          minStock: 50,
          unitPrice: 850,
          description: 'Premium granite tiles for premium finishes',
        },
        {
          code: 'PAINT-001',
          name: 'Exterior Paint - White',
          category: 'Paint & Coating',
          unit: 'Liter',
          quantity: 1000,
          minStock: 200,
          unitPrice: 350,
          description: 'Weather-resistant exterior paint',
        },
        {
          code: 'PAINT-002',
          name: 'Interior Emulsion Paint',
          category: 'Paint & Coating',
          unit: 'Liter',
          quantity: 800,
          minStock: 150,
          unitPrice: 280,
          description: 'Premium interior emulsion paint',
        },
      ],
    })

    // Create suppliers
    await prisma.supplier.createMany({
      data: [
        {
          name: 'Premier Cement Corp',
          email: 'premier@cement.com',
          phone: '9876543210',
          address: 'Industrial Area',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001',
        },
        {
          name: 'Steel Traders International',
          email: 'steel@traders.com',
          phone: '8765432109',
          address: 'Steel Market',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
        },
        {
          name: 'National Sand & Aggregate',
          email: 'sand@national.com',
          phone: '7654321098',
          address: 'River Beds',
          city: 'Chennai',
          state: 'Tamil Nadu',
          pincode: '600001',
        },
        {
          name: 'Quality Brick Manufacturers',
          email: 'bricks@quality.com',
          phone: '6543210987',
          address: 'Brick Kiln Area',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500001',
        },
        {
          name: 'Express Paint Solutions',
          email: 'paint@express.com',
          phone: '5432109876',
          address: 'Chemical Zone',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560001',
        },
        {
          name: 'Tile & Stone Wholesale',
          email: 'tiles@wholesale.com',
          phone: '4321098765',
          address: 'Tile Market',
          city: 'Pune',
          state: 'Maharashtra',
          pincode: '411001',
        },
      ],
    })

    // Create customers
    await prisma.customer.createMany({
      data: [
        {
          name: 'Apex Construction Ltd',
          email: 'apex@construction.com',
          phone: '9012345678',
          address: 'Project Site, Sector 5',
          city: 'Noida',
          state: 'Uttar Pradesh',
          pincode: '201301',
        },
        {
          name: 'BuildRight Projects',
          email: 'buildright@projects.com',
          phone: '8901234567',
          address: '321 Build Lane',
          city: 'Pune',
          state: 'Maharashtra',
          pincode: '411001',
        },
        {
          name: 'Metro Infrastructure Dev',
          email: 'metro@infrastructure.com',
          phone: '7890123456',
          address: 'Central Hub',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
        },
        {
          name: 'Green Valley Homes',
          email: 'green@valley.com',
          phone: '6789012345',
          address: 'Township Project',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560001',
        },
        {
          name: 'Urban Developers Pvt Ltd',
          email: 'urban@developers.com',
          phone: '5678901234',
          address: 'Real Estate Hub',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500001',
        },
      ],
    })

    // Create vehicles
    await prisma.vehicle.createMany({
      data: [
        {
          registrationNo: 'DL01AB1234',
          model: 'Tata 1109',
          type: 'Truck',
          capacity: 10000,
          fuelType: 'Diesel',
          chassisNo: 'TATA1234567',
          engineNo: 'ENGINE1234',
          owner: 'Company Fleet',
        },
        {
          registrationNo: 'MH02CD5678',
          model: 'Ashok Leyland 3516',
          type: 'Truck',
          capacity: 12000,
          fuelType: 'Diesel',
          chassisNo: 'ASHOK5678901',
          engineNo: 'ENGINE5678',
          owner: 'Company Fleet',
        },
        {
          registrationNo: 'KA03EF9012',
          model: 'Tata 407',
          type: 'Truck',
          capacity: 6000,
          fuelType: 'Diesel',
          chassisNo: 'TATA9012345',
          engineNo: 'ENGINE9012',
          owner: 'Company Fleet',
        },
        {
          registrationNo: 'TN04GH3456',
          model: 'Mahindra Bolero Pik-Up',
          type: 'Pick-up',
          capacity: 1000,
          fuelType: 'Diesel',
          chassisNo: 'MAHI3456789',
          engineNo: 'ENGINE3456',
          owner: 'Company Fleet',
        },
      ],
    })

    // Create drivers
    await prisma.driver.createMany({
      data: [
        {
          name: 'Ram Kumar Singh',
          phone: '9988776655',
          licenseNo: 'DL0123456789',
          address: '123 Driver Lane',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001',
        },
        {
          name: 'Shiva Prasad Rao',
          phone: '9988776656',
          licenseNo: 'DL0123456790',
          address: '456 Driver Lane',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001',
        },
        {
          name: 'Rajesh Kumar Verma',
          phone: '9988776657',
          licenseNo: 'MH0234567891',
          address: '789 Transport Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
        },
        {
          name: 'Vikram Singh Chauhan',
          phone: '9988776658',
          licenseNo: 'KA0345678912',
          address: '321 Delivery Street',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560001',
        },
      ],
    })

    // Get IDs for transactions
    const materials = await prisma.material.findMany()
    const suppliers = await prisma.supplier.findMany()
    const customers = await prisma.customer.findMany()

    // Create purchases
    if (materials.length > 0 && suppliers.length > 0) {
      await prisma.purchase.createMany({
        data: [
          {
            invoiceNo: 'INV-PO-2024-001',
            supplierId: suppliers[0].id,
            materialId: materials[0].id,
            quantity: 200,
            unitPrice: 380,
            totalAmount: 76000,
            gst: 5,
            finalAmount: 79800,
            purchaseDate: new Date('2024-01-15'),
          },
          {
            invoiceNo: 'INV-PO-2024-002',
            supplierId: suppliers[1].id,
            materialId: materials[4].id,
            quantity: 50,
            unitPrice: 52000,
            totalAmount: 2600000,
            gst: 5,
            finalAmount: 2730000,
            purchaseDate: new Date('2024-02-01'),
          },
          {
            invoiceNo: 'INV-PO-2024-003',
            supplierId: suppliers[2].id,
            materialId: materials[2].id,
            quantity: 75,
            unitPrice: 850,
            totalAmount: 63750,
            gst: 5,
            finalAmount: 66937.5,
            purchaseDate: new Date('2024-02-10'),
          },
        ],
      })
    }

    // Create sales
    if (materials.length > 0 && customers.length > 0) {
      await prisma.sale.createMany({
        data: [
          {
            invoiceNo: 'INV-SO-2024-001',
            customerId: customers[0].id,
            materialId: materials[0].id,
            quantity: 150,
            unitPrice: 400,
            totalAmount: 60000,
            gst: 5,
            finalAmount: 63000,
            saleDate: new Date('2024-01-20'),
          },
          {
            invoiceNo: 'INV-SO-2024-002',
            customerId: customers[1].id,
            materialId: materials[4].id,
            quantity: 30,
            unitPrice: 55000,
            totalAmount: 1650000,
            gst: 5,
            finalAmount: 1732500,
            saleDate: new Date('2024-02-03'),
          },
          {
            invoiceNo: 'INV-SO-2024-003',
            customerId: customers[2].id,
            materialId: materials[6].id,
            quantity: 100,
            unitPrice: 4800,
            totalAmount: 480000,
            gst: 5,
            finalAmount: 504000,
            saleDate: new Date('2024-02-11'),
          },
        ],
      })
    }

    // Create expenses
    await prisma.expense.createMany({
      data: [
        {
          category: 'Transport',
          amount: 15000,
          description: 'Fuel charges for transport',
          date: new Date('2024-02-01'),
        },
        {
          category: 'Maintenance',
          amount: 8000,
          description: 'Vehicle maintenance',
          date: new Date('2024-02-05'),
        },
        {
          category: 'Labour',
          amount: 25000,
          description: 'Loading and unloading labour',
          date: new Date('2024-02-10'),
        },
      ],
    })

    // Create diesel entries
    const vehicles = await prisma.vehicle.findMany()
    if (vehicles.length > 0) {
      await prisma.dieselEntry.createMany({
        data: [
          {
            vehicleId: vehicles[0].id,
            date: new Date('2024-02-01'),
            quantity: 150,
            rate: 90,
            amount: 13500,
          },
          {
            vehicleId: vehicles[1].id,
            date: new Date('2024-02-05'),
            quantity: 200,
            rate: 90,
            amount: 18000,
          },
          {
            vehicleId: vehicles[0].id,
            date: new Date('2024-02-08'),
            quantity: 120,
            rate: 90,
            amount: 10800,
          },
        ],
      })
    }

    console.log('Database seeded successfully!')
    console.log('Admin email: admin@example.com')
    console.log('Admin password: admin123')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
