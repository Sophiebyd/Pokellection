module.exports = {
  test : (req, res, next) => {
    console.log('je suis le middleware') 
    next ()
  },
    isAdmin: async (req, res, next) => {
      if(!req.session.user) return res.redirect('/')
      const [user] = await db.query(`SELECT isAdmin FROM users WHERE mail="${req.session.user.email}"`);
      ( user.isAdmin === req.session.user.isAdmin && user.isAdmin === 0 ) ? res.redirect('/') : next();
    },
    isSession: async (req, res, next) => {
      if(!req.session.user) return res.redirect('back');
      console.log('req.session.user.middleware', req.session.user)
      next()
    },
    checkLayout: async (req, res, next) => {
      if (!req.session.user || !req.session.user.id) next()
      else if (req.session.user.id) {
          const [data] = await db.query(`SELECT isAdmin FROM users WHERE mail="${req.session.user.email}"`);
          (data.isAdmin === req.session.user.is_admin && data.isAdmin === 1) ? res.locals = { layout: "admin" } : res.locals = { layout: "user" }
          next()
      }
    }
}
