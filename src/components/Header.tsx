
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Layers, 
  GitBranch, 
  Hash, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={cn(
          "flex items-center gap-2 px-4 py-2 w-full justify-start",
          isActive && "bg-accent text-accent-foreground"
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
};

interface HeaderProps {
  activePath: string;
}

const Header: React.FC<HeaderProps> = ({ activePath }) => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { to: "/", icon: <Home size={18} />, label: "Home" },
    { to: "/arrays", icon: <Layers size={18} />, label: "Arrays & Sorting" },
    { to: "/linked-lists", icon: <Hash size={18} />, label: "Linked Lists" },
    { to: "/trees", icon: <GitBranch size={18} />, label: "Trees" },
    { to: "/pathfinding", icon: <Settings size={18} />, label: "Pathfinding" },
  ];

  return (
    <header className="w-full glass-effect sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-primary font-semibold text-xl">
            DSA<span className="font-light">Visualizer</span>
          </div>
        </Link>
        
        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            
            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 glass-effect border-b animate-fade-in">
                <nav className="container mx-auto py-4 px-4 flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      icon={link.icon}
                      label={link.label}
                      isActive={activePath === link.to}
                    />
                  ))}
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                icon={link.icon}
                label={link.label}
                isActive={activePath === link.to}
              />
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
