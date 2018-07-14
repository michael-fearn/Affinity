// MAKE SURE TO USE THE MIDDLEWARE USING app.use() ABOVE ALL OF THE ENDPOINTS THAT YOU WANT THE MIDDLEWARE TO APPLY TO.

app.use(authMid.bypassAuthInDevelopment)
    
app.get('/auth/callback', authCtrl.callback);
    
app.post('/api/favorites', ctrl.addFavThing)

app.get('/api/user-data', authCtrl.check)