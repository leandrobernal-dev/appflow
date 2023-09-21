import GoogleProvider from "next-auth/providers/google";

import User from "@/models/User";
import dbConnect from "@/db/database";

export const options = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	// pages: {
	// 	signIn: "/auth/login",
	// 	newUser: "/auth/register",
	// },
	callbacks: {
		async signIn({ user, profile, account, email, credentials }) {
			// console.log({ account, profile });
			if (account.type === "oauth") {
				await dbConnect();
				return await signInWithOAuth({ account, profile });
			}
			return true;
		},
		async jwt({ token, trigger, session }) {
			// console.log(token);
			const user = await getUserByEmail({ email: token.email });
			// console.log(user);
			return token;
		},
		async session({ session, token }) {
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // set session duration to 30days
	},
};

async function signInWithOAuth({ account, profile }) {
	const user = await User.findOne({ email: profile.email });
	// console.log({ user });
	if (user) return true;

	const newUser = new User({
		email: profile.email,
		name: profile.name,
		provider: account.provider,
	});
	await newUser.save();
	// console.log({ newUser });
	return true;
}

async function getUserByEmail({ email }) {
	const user = await User.findOne({ email: email });

	if (!user) throw new Error("Email does not exist");

	return { ...user._doc, _id: user._id.toString() };
}
