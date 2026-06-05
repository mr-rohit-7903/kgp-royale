import { FaBullhorn, FaCamera, FaCrown, FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaShieldAlt } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";

const Founders = [
  { 
    name: "Rohit Bej", 
    role: "Founder", 
    icon: ({className}: {className?: string}) => <FaCrown className={(className || "") + " "} />, 
    avatar: <img src="/images/founder.png" alt="Rohit Bej" className="w-full h-full object-cover" />, 
    color: "bg-[hsl(var(--tertiary))]",
    socials: {
      github: "https://github.com/mr-rohit-7903",
      instagram: "https://instagram.com/imrohitbej",
      linkedin: "https://linkedin.com/in/mr-rohit-",
      email: "mailto:rohit098bej@gmail.com"
    }
  },
];

/*
const Members = [
  { name: "Rahul Kumar", role: "Tournament Officer", icon: ({className}: {className?: string}) => <GiCrossedSwords className={(className || "") + " "} />, avatar: "⚔️", color: "bg-[hsl(var(--primary))]" },
  { name: "Sneha Reddy", role: "Media Head", icon: ({className}: {className?: string}) => <FaCamera className={(className || "") + " "} />, avatar: "📸", color: "bg-[hsl(var(--secondary))]" },
  { name: "Vikram Singh", role: "PR & Outreach", icon: ({className}: {className?: string}) => <FaBullhorn className={(className || "") + " "} />, avatar: "📢", color: "bg-[hsl(var(--tertiary))]" },
  { name: "Harsh Shukla", role: "Tech & Website", icon: ({className}: {className?: string}) => <FaShieldAlt className={(className || "") + " "} />, avatar: "💻", color: "bg-[hsl(var(--quaternary))]" },
  { name: "Kritika Patil", role: "Creative Team", icon: ({className}: {className?: string}) => <FaCrown className={(className || "") + " "} />, avatar: "✨", color: "bg-[hsl(var(--primary))]" },
];
*/

const TeamSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-[hsl(var(--tertiary))] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[hsl(var(--secondary))] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 animate-pulse [animation-delay:1s]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Founders Section */}
        <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {Founders.map((founder, index) => (
            <TeamCard key={index} member={founder} isFounder={true} />
          ))}
        </div>

        {/* Core Members Section - Commented Out
        <div className="text-center mb-16">
          <h2 className="font-outfit font-black text-5xl md:text-7xl text-foreground mb-6 drop-shadow-[4px_4px_0px_white]">
            CORE <span className="text-primary">WARRIORS</span>
          </h2>
          <div className="w-40 h-4 bg-primary mx-auto rounded-full border-4 border-foreground shadow-hard" />
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {Members.map((member, index) => (
            <TeamCard key={index} member={member} isFounder={false} />
          ))}
        </div>
        */}
      </div>
    </section>
  );
};

const TeamCard = ({ member, isFounder }) => {
  const Icon = member.icon;
  
  return (
    <div className={`group relative bg-card border-4 border-foreground rounded-[2.5rem] shadow-soft-hard p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-hard-hover hover:-translate-y-2 ${
      isFounder ? "w-72 md:w-80 p-10" : "w-64"
    }`}>
      {/* Avatar Container */}
      <div className="relative mb-6">
        <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full ${member.color} border-4 border-foreground shadow-hard overflow-hidden flex items-center justify-center text-5xl md:text-6xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
          {member.avatar}
        </div>
      </div>

      {/* Info */}
      <h3 className={`font-outfit font-black text-foreground mb-2 tracking-tight ${
        isFounder ? "text-3xl md:text-4xl" : "text-2xl"
      }`}>
        {member.name}
      </h3>
      
      <div className={`inline-flex items-center bg-slate-100 border-2 border-slate-200 rounded-xl px-4 py-1.5 font-jakarta font-bold text-muted-foreground ${
        isFounder ? "text-base" : "text-sm"
      }`}>
        {member.role}
      </div>

      {/* Social Links */}
      {member.socials && (
        <div className="flex items-center justify-center gap-3 mt-6">
          {member.socials.github && (
            <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-900 border-2 border-foreground shadow-hard flex items-center justify-center text-white hover:-translate-y-1 transition-all">
              <FaGithub />
            </a>
          )}
          {member.socials.instagram && (
            <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#E4405F] border-2 border-foreground shadow-hard flex items-center justify-center text-white hover:-translate-y-1 transition-all">
              <FaInstagram />
            </a>
          )}
          {member.socials.linkedin && (
            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#0077B5] border-2 border-foreground shadow-hard flex items-center justify-center text-white hover:-translate-y-1 transition-all">
              <FaLinkedin />
            </a>
          )}
          {member.socials.email && (
            <a href={member.socials.email} className="w-10 h-10 rounded-lg bg-[#D14836] border-2 border-foreground shadow-hard flex items-center justify-center text-white hover:-translate-y-1 transition-all">
              <FaEnvelope />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamSection;
