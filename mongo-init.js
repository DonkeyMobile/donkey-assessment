db.createUser(
  {
    user: 'donkeyUser',
    pwd: 'reallySecret',
    roles: [
      {
        role: 'readWrite',
        db: 'donkey'
      }
    ]
  }
)
