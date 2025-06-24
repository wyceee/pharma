const users = [
    //all passwords are hashed versions of 'password123'
    {
        email: 'test@example.com',
        password: '$2b$10$rkOpBZXif.lnOaWkgeJG/ui17qjKbNLpCwPYw72n41mcbf674KPTu',
        role: 'Admin'
    },
    {
        email: 'manufacturer@example.com',
        password: '$2b$10$rkOpBZXif.lnOaWkgeJG/ui17qjKbNLpCwPYw72n41mcbf674KPTu',
        role: 'Manufacturer'
    },
    {
        email: 'qualitycontrol@example.com',
        password: '$2b$10$rkOpBZXif.lnOaWkgeJG/ui17qjKbNLpCwPYw72n41mcbf674KPTu',
        role: 'QualityControl'
    },
    {
        email: 'distributor@example.com',
        password: '$2b$10$rkOpBZXif.lnOaWkgeJG/ui17qjKbNLpCwPYw72n41mcbf674KPTu',
        role: 'Distributor'
    },
    {
        email: 'pharmacy@example.com',
        password: '$2b$10$rkOpBZXif.lnOaWkgeJG/ui17qjKbNLpCwPYw72n41mcbf674KPTu',
        role: 'Pharmacy'
    },
    {
        email: 'customer@example.com',
        password: '$2b$10$rkOpBZXif.lnOaWkgeJG/ui17qjKbNLpCwPYw72n41mcbf674KPTu',
        role: 'Customer'
    }
];

export default {
    findByEmail: async (email) => users.find(u => u.email === email)
};