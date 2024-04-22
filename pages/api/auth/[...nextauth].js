import NextAuth from "next-auth";
import Providers from "next-auth/providers/credentials";
import axios from "axios";

const providers = [
  Providers({
    name: "Credentials",
    // credentials: {
    //   email: {
    //     label: "email",
    //     type: "email",
    //   },
    //   password: { label: "Password", type: "password" },
    // },
    authorize: async (credentials) => {
      try {
        const user = await axios.post(
          `${process.env.NEXTAUTH_URL}/users/login`,
          {
            email: credentials.email,
            password: credentials.password,
          },
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );

        if (user) {
          return {
            status: "success",
            data: {
              access_token: user.data.access_token,
              email: credentials.email,
              role: user.data.role,
            },
          };
        }
      } catch (e) {
        const errorMessage = e.response.data.message;
        // Redirecting to the login page with error messsage in the URL
        throw new Error(errorMessage);
      }
    },
  }),
];

const callbacks = {
  async jwt({ token, user, account }) {
    if (user) {
      token.email = user.data.email;
      token.accessToken = user.data.access_token;
      token.role = user.data.role;
    }

    return token;
  },

  async session({ session, token }) {
    // console.log(session, token);

    session.accessToken = token.accessToken;
    session.role = token.role;
    return session;
  },
};

const options = {
  providers,
  callbacks,
  pages: {
    signIn: "/login", // Changing the error redirect page to our custom login page
  },
  //   secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  secret: "test",
  // jwt: {
  //   secret: "test",
  //   encryption: true,
  // },
};

export default (req, res) => NextAuth(req, res, options);
