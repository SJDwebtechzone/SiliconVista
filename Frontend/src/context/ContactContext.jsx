import { useContext , createContext , useState } from "react";
import axios from 'axios';

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [loading , setloading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const sendEnquiry = async (formData) => {
        setloading(true);
        setSuccessMsg("");
        setErrorMsg("");

        const url = `${import.meta.env.VITE_API_BASE_URL}/contact`;

        try{
            const res = await axios.post(url,formData);

            setSuccessMsg(res.data.message || "Enquiry sent successfully");

            return {ok: true}
        } catch(error){
                  if (error.response) {
                        setErrorMsg(error.response.data.message);
                } else {
                        setErrorMsg("Something went wrong. Try again later.");
                }
                return {ok: false}
    }
    finally {
      setloading(false);
    }
}

        return (
            <ContactContext.Provider
            value={{ sendEnquiry, loading, successMsg, errorMsg }}
            >
                {children}
            </ContactContext.Provider>
        )
}

export const useContact = () => useContext(ContactContext);
