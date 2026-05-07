const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/orders', (req, res) => {
  const db = router.db;
  let orders = db.get('orders').value();
  
  const search = req.query.search || '';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  
  if (search) {
    orders = orders.filter(order => 
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.client.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedOrders = orders.slice(start, end);
  
  res.jsonp({
    data: paginatedOrders,
    total: orders.length,
    page: page,
    totalPages: Math.ceil(orders.length / limit)
  });
});

server.use(router);
server.listen(3000, () => {
  console.log('✅ JSON Server running on http://localhost:3000');
});