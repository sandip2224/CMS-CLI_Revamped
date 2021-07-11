const mongoose=require('mongoose');
const customer = require('./models/customer');

//Get rid of warnings
mongoose.Promise=global.Promise;

// Connect to database
const db=mongoose.connect('mongodb://localhost:27017/customercli', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

//Import model
const customerModel=require('./models/customer');

//Add Customer
const addCustomer=(customer)=>{
    customerModel.create(customer).then(customer=>{
        console.info('📝 New Customer added');
        mongoose.connection.close();
    })
}

//Find Customer
const findCustomer=(name)=>{
    const search=new RegExp(name, 'i');
    customerModel.find({$or: [{firstName: search}, {lastName: search}]}).then(c1=>{
        c1.forEach(c2=>{
            console.info("⚡ First Name    : "+c2.firstName);
            console.info("⚡ Last Name     : "+c2.lastName);
            console.info("📞 Phone Number  : "+c2.phone);
            console.info("📩 Email Address : "+c2.email);
            console.info(" ");
        })
        console.info(`🔍️ Matches found: ${c1.length}`);
        mongoose.connection.close();
    });
}

//Update Customer
const updateCustomer=(_id, customer)=>{
    customerModel.updateOne(_id, customer).then(customer=>{
        console.info('✔ Customer updated')
        mongoose.connection.close();
    })
}

//Remove customer
const removeCustomer=(_id)=>{
    customerModel.deleteOne({_id}).then(customer=>{
        console.info('✏️ Customer removed')
        mongoose.connection.close();
    })
}

//List all customers
const listCustomers=()=>{
    customerModel.find().then(customers=>{
        customers.forEach(customer=>{
            console.info("⚡ First Name    : "+customer.firstName);
            console.info("⚡ Last Name     : "+customer.lastName);
            console.info("📞 Phone Number  : "+customer.phone);
            console.info("📩 Email Address : "+customer.email);
            console.info(" ");
        })
        // console.info(customers)
        console.info(`🔍️ ${customers.length} customer(s) found`)
        mongoose.connection.close();
    })
}

// Export methods
module.exports={
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}