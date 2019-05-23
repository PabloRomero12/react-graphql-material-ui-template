exports.typeDefs = `
type Recipe{
    _id:ID
    name: String!
    category: String!
    description:String!
    instructions:String!
    picture:String
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

    getCurrentUser: User

    getRecipe(_id:ID): Recipe
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
        picture:String,
        username:String
    ) : Recipe

    signupUser(
        username:String!
        email:String!
        password:String!
    ):Token

    signinUser(
        username:String!
        password:String!
    ):Token
}
`;
