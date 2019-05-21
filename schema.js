exports.typeDefs = `
type Recipe{
    _id:ID
    name: String!
    category: String!
    description:String!
    instructions:String!
    createdDate:String
    likes: Int
    username: String
}

type User{
    _id:ID
    username:String!
    password: String!
    email: String!
    joinedDate: String
    favorites:[Recipe]
}

type Query{
    getAllRecipes:[Recipe]
}

type Token{
    token: String!
}

type Mutation{
    addRecipe(
        name:String!,
        description:String!,
        category:String!,
        instructions:String!,
        username:String
    ) : Recipe

    signupUser(
        username:String!
        email:String!
        password:String!
    ):Token
}
`;
