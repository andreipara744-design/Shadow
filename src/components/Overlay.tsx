import { Scroll } from '@react-three/drei';
import { useState } from 'react';
import { motion } from 'motion/react';

const glowStyle = { textShadow: '0 0 10px #FFFFFF, 0 0 20px #E2E8F0, 0 0 30px #CBD5E1' };

const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  const lines = text.split('\n');

  return (
    <motion.div
      className={className}
      style={glowStyle}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.1 }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="block mb-2">
          {line.split(' ').map((word, wordIndex) => (
            <motion.span
              key={`${lineIndex}-${wordIndex}`}
              className="inline-block mr-[0.25em]"
              variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  filter: 'blur(0px)', 
                  transition: { duration: 0.8, ease: "easeOut" } 
                }
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default function Overlay() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !website) return;
    
    setFormState('loading');

    try {
      fetch("https://script.google.com/macros/s/AKfycbxt5Dw9KZT1TsOgtvLX8ADeGexU1IS5Oa-EZbBaGxfPJrRNnjWofWccbloriVawgVi9/exec", {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ email, website })
      });
    } catch (err) {
      console.error(err);
    }

    // Immediate cinematic confirmation after 2 seconds
    setTimeout(() => {
      setFormState('success');
    }, 2000);
  };

  return (
    <Scroll html style={{ width: '100%' }}>
      <div className="w-full text-white font-sans pointer-events-none">
        
        {/* SCENE 1 */}
        <div className="h-screen flex flex-col items-center justify-center px-6 text-center">
          <AnimatedText 
            text={"You built a business, but lost your freedom.\nThe phone rings at dinner.\nSuccess became your own prison."}
            className="text-2xl md:text-4xl font-light tracking-wide max-w-3xl leading-relaxed text-white"
          />
        </div>

        {/* SCENE 2 */}
        <div className="h-screen flex flex-col items-center justify-center px-6 text-center">
          <AnimatedText 
            text={"You don't need a better schedule.\nYou need a clone.\nThe elite use Autonomous Agents."}
            className="text-2xl md:text-4xl font-light tracking-wide max-w-3xl leading-relaxed text-white"
          />
        </div>

        {/* SCENE 3 */}
        <div className="h-screen flex flex-col items-center justify-center px-6 text-center">
          <AnimatedText 
            text={"A digital Shadow that thinks like you.\nNegotiates at 3 AM.\nCloses deals. Zero breaks."}
            className="text-2xl md:text-4xl font-light tracking-wide max-w-3xl leading-relaxed text-white"
          />
        </div>

        {/* SCENE 4 */}
        <div className="h-screen flex flex-col items-center justify-center px-6 text-center">
          <AnimatedText 
            text={"Reclaim your life.\nLet the Shadow work.\nApply for your architecture."}
            className="text-3xl md:text-5xl font-medium tracking-tight max-w-3xl leading-relaxed text-white mb-12"
          />
        </div>

        {/* FORM SECTION */}
        <div className="h-screen flex flex-col items-center justify-center px-6 pointer-events-auto">
          {formState === 'idle' && (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.5 }}
              onSubmit={handleSubmit} 
              className="flex flex-col items-center w-full max-w-md gap-6"
            >
              <input
                type="email"
                required
                placeholder="Your private email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/90 border border-white/50 text-white px-4 py-4 focus:outline-none focus:border-white focus:shadow-[0_0_20px_#FFFFFF] shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all text-center text-lg placeholder:text-white/80 rounded-md"
                style={glowStyle}
              />
              <input
                type="url"
                required
                placeholder="Your business URL (e.g. https://...)"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-black/90 border border-white/50 text-white px-4 py-4 focus:outline-none focus:border-white focus:shadow-[0_0_20px_#FFFFFF] shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all text-center text-lg placeholder:text-white/80 rounded-md"
                style={glowStyle}
              />
              <button
                type="submit"
                className="px-8 py-4 border border-white bg-black/90 text-white hover:bg-white hover:text-black hover:shadow-[0_0_30px_#FFFFFF] shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 tracking-widest uppercase text-sm font-bold cursor-pointer mt-2 rounded-md w-full"
                style={glowStyle}
              >
                ACTIVATE SHADOW
              </button>
            </motion.form>
          )}

          {formState === 'loading' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center animate-pulse bg-black/60 p-8 rounded-xl backdrop-blur-sm"
            >
              <p className="text-xl md:text-2xl font-medium text-white tracking-widest" style={glowStyle}>
                INITIALIZING SHADOW SYSTEM...
              </p>
            </motion.div>
          )}

          {formState === 'success' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center bg-black/60 p-8 rounded-xl backdrop-blur-sm"
            >
              <p className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6" style={{ textShadow: '0 0 20px #FFFFFF, 0 0 40px #E2E8F0, 0 0 60px #CBD5E1' }}>
                DONE.
              </p>
              <p className="text-white text-lg md:text-xl font-light" style={glowStyle}>
                Shadow System Activated. Check your inbox for the Audit.
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </Scroll>
  );
}
