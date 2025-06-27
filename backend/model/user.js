const users = [
    {
        email: 'manufacturer@example.com',
        // Password: manufacturer123
        password: '$2b$10$Ck19ywB7yg6552UffP0cyeR6JnEFtG0DY41wFDNCEFWV/FD41Ey9q',
        role: 'Manufacturer'
    },
    {
        email: 'distributor@example.com',
        // Password: distributor123
        password: '$2b$10$EAisKjJ30zRT/YtSYV19x.i7S8AkpVY4SqbtMa/UZESio8Z6xQisq',
        role: 'Distributor'
    }
];

export default {
    findByEmail: async (email) => users.find(u => u.email === email)
};