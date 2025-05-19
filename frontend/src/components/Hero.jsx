import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "./ui/button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["Lovable :)", "Spicy!", "Emotional", "beautiful", "smart"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

return (
    <div className="w-full">
        <div className="container mx-auto">
            <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
                <div>
                    
                </div>
                <div className="flex gap-4 flex-col">
                    <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                        <span className="text-spektr-cyan-50">Chattifier is Start of Something</span>
                        <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                            &nbsp;
                            {titles.map((title, index) => (
                                <motion.span
                                    key={index}
                                    className="absolute font-semibold"
                                    initial={{ opacity: 0, y: "-100" }}
                                    transition={{ type: "spring", stiffness: 50 }}
                                    animate={
                                        titleNumber === index
                                            ? { y: 0, opacity: 1 }
                                            : {
                                                    y: titleNumber > index ? -150 : 150,
                                                    opacity: 0,
                                                }
                                    }
                                >
                                    {title}
                                </motion.span>
                            ))}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                    Stay connected with the people who matter.
                    Our chat app makes messaging fast, simple, and seamless — no clutter, no distractions. Whether you're catching up with friends or collaborating with teammates, everything happens in real time. Ready to start the conversation?
                    </p>
                </div>
                <div className="flex flex-row gap-3">
                <Button  onClick={() => (window.location.href = "/signup")}size="lg" className="gap-4" variant="outline">
              SignUp here
            </Button>

            <Button  onClick={() => (window.location.href = "/login")} size="lg" className="gap-4">
              LogIn Now <MoveRight className="w-4 h-4" />
            </Button>
                </div>
            </div>
        </div>
    </div>
);
}

export default Hero;