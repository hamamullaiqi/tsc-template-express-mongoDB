import bcrypt from "bcrypt";
export const hashedPassword = async (password:string) => {
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    return hashedPassword;
};
