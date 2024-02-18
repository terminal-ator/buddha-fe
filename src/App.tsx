import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gqczqqtvyrrertcluzry.supabase.co",
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxY3pxcXR2eXJyZXJ0Y2x1enJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMTY2OTksImV4cCI6MjAyMzU5MjY5OX0.eYCCpeoipl4jCKxvsjvg9oRkJ6SBUpPxO7Fk11sdBOY`
);

function App() {
  const [email, setEmail] = useState("");
  const [gave, setGave] = useState(false);

  const saveEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.from("emails").insert([{ email }]);
    if (error) {
      alert("Go error, " + error.message + error.hint);
    } else {
      localStorage.setItem("gave", email);
      setGave(true);
    }
  };

  useEffect(() => {
    const priorGave = localStorage.getItem("gave");
    if (priorGave) {
      setGave(true);
    }
    console.log(
      "Know programming and want to contribute? Email me this code HxllxWxrld @ itushargarg@gmail.com"
    );
  }, []);

  return (
    <>
      <div className="p-8 flex flex-col bg-yellow-400 rounded-xl sm:w-1/2 w-full m-auto min-h-80 max-h-full">
        <h1 className="text-4xl font-bold">
          A new era of <span className="text-green-400">Education</span>
          <p className="block">is about to begin</p>
        </h1>
        <h2 className="text-xl font-semibold text-gray-500">
          Learn important life skills from interactive mini courses
        </h2>
        {!gave ? (
          <div className="mt-10">
            <h3 className="text-lg text-gray-800">Join the waitlist</h3>
            <form
              onSubmit={saveEmail}
              className="flex flex-row justify-center gap-2 align-middle mt-4"
            >
              <input
                className={`py-3 px-4 block w-full
               rounded-lg text-sm
                 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 
                 disabled:pointer-events-none`}
                type="email"
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="submit"
                className="p-2  rounded-lg bg-white hover:bg-gray-200 hover:cursor-pointer"
              />
            </form>
          </div>
        ) : (
          <div>
            <p>
              Thank you for your interest, we will let you know when we get
              started
            </p>
          </div>
        )}
      </div>
      <div className=" sm:w-1/2 w-full flex flex-row m-auto  min-h-40  mt-4 gap-4 ">
        <div className="bg-lime-300 text-wrap rounded-lg w-1/2 flex justify-center">
          <p className="flex flex-col justify-center">
            <span>For Just</span>
            <h2 className="font-bold text-2xl">Rs. 120/month</h2>
            <span>Unlimited access for you and your family</span>
            <span className="text-sm text-gray-600">
              * thats less than what a pizza cost
            </span>
          </p>
        </div>
        <div className="bg-blue-400  w-1/2  rounded-lg flex flex-col justify-center">
          <p className="flex flex-col justify-center font-bold text-2xl ">
            Learn anywhere from your phone
          </p>
        </div>
      </div>
      <div className="sm:w-1/2 w-full flex flex-col m-auto  h-40 mt-4 gap-4 ">
        <p className="text-left">
          <h2 className="text-xl font-bold">
            Things they probably forgot to teach at your school.
          </h2>
          We got mini courses on topics like Communication, Memory Good habits
          and many more
        </p>
      </div>
    </>
  );
}

export default App;
