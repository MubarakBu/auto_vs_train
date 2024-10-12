var ENV = process.env.NODE_ENV || 'development';

if (ENV == 'production') {
    var HOST=''
} else if (ENV ==  'development') {
    var HOST = 'localhost:3001'
} else {
    console.log('Environment not set in Config')
    var HOST = 'localhost:3001'
}


export {HOST}