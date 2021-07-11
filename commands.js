#!/usr/bin/env node

const program=require('commander');
const {prompt}=require('inquirer');
const { addCustomer,
        findCustomer,
        updateCustomer,
        removeCustomer,
        listCustomers }=require('./app');

//Questions
const questions=[
    {
        type:'input',
        name:'firstName',
        message:'First Name:'
    },
    {
        type:'input',
        name:'lastName',
        message:'Last Name:'
    },
    {
        type:'input',
        name:'phone',
        message:'Phone Number:'
    },
    {
        type:'input',
        name:'email',
        message:'Email address:'
    }
]

program
    .version('1.0.0')
    .alias('v')
    .description('✨CMS-Revamped✨')

program
    .command('add')
    .alias('a')
    .description('🎨 Add a new customer')
    .action(()=>{
        prompt(questions).then(answers=>{
            addCustomer(answers)
        })
    })

program
    .command('find <name>')
    .alias('f')
    .description('🔍 Find an existing customer')
    .action((name) => {
        findCustomer(name);
    });

program
    .command('update')
    .alias('u')
    .description('✏️ Update an existing customer')
    .action((_id)=>{
        prompt(questions).then(answers=>{
            updateCustomer(_id, answers)
        })
    })

program
    .command('remove <_id>')
    .alias('r')
    .description('⚡️ Remove an existing customer')
    .action((_id) => {
        removeCustomer(_id);
    });

program
    .command('list')
    .alias('l')
    .description('🔒️ List out existing customers')
    .action(() => {
        listCustomers();
    });

program.parse(process.argv);