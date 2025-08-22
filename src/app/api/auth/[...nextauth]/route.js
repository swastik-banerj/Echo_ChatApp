import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectDB } from '../../../../../lib/db';
import User from '../../../../../models/User.model';


const handler = NextAuth({
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

  ],

  session: {
    strategy: "jwt"
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {

    async signIn({ user }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          username: user.name,
          email: user.email,
          image: user.image,
        });
      }

      return true;
    },

    async jwt({token, account, profile}){

        if(account){
          await connectDB();

          let dbUser = await User.findOne({email: profile.email});

          if(!dbUser){
              dbUser = await User.create({
                  username: profile.name,
                  email: profile.email,
                  image: profile.image,
              });
          }

          token.id = dbUser._id.toString();
        }

        return token;
    },

    async session({session, token}) {
        session.user.id = token.id;
        return session;
    }

  }
});

export { handler as GET, handler as POST };