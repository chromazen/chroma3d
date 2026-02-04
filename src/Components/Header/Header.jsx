// src/Components/Header/Header.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { motion } from "framer-motion";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <header className="sticky top-0 z-50">
      {/* Top hairline */}
      <div className="h-px w-full bg-white/10" />

      {/* Glass navbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          relative border-b border-white/10 bg-white/5 backdrop-blur-md
          after:absolute after:bottom-0 after:left-0 after:right-0
          after:h-[1px] after:bg-gradient-to-r
          after:from-black after:via-orange-500 after:to-black
        "
      >
        <div className="h-16 flex items-center justify-between px-4">
          {/* Logo + Brand */}
          <NavLink to="/" className="inline-flex items-center gap-3">
            <img
              src="/headerlogo.svg"
              alt="Chroma3D"
              className="h-9 sm:h-10 w-auto"
              draggable={false}
            />

            <span
              className="text-[26px] sm:text-[30px] leading-none"
              style={{ fontFamily: "'StardusterLasital', system-ui, sans-serif" }}
            >
              <span className="text-white">chroma</span>
              <span className="text-orange-500">3D</span>
            </span>
          </NavLink>

          {/* Desktop navigation */}
          <nav className="hidden sm:flex items-center gap-8 text-sm text-white/80">
            {NAV.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500"
                    : "hover:text-orange-500 transition-colors"
                }
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/get-quote"
              className={({ isActive }) =>
                `
                rounded-xl border border-white/15 bg-white/10 px-4 py-2
                transition-colors
                ${
                  isActive
                    ? "text-orange-500"
                    : "hover:text-orange-500 hover:bg-white/15"
                }
              `
              }
            >
              Get Quote
            </NavLink>
          </nav>

          {/* Mobile navigation */}
          <div className="sm:hidden">
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              size="small"
              sx={{
                color: "white",
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: "12px",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.14)" },
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 2,
                  bgcolor: "rgba(20,20,22,0.9)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "white",
                },
              }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
            >
              <MenuItem
                onClick={() => setAnchorEl(null)}
                sx={{ justifyContent: "flex-end" }}
              >
                <CloseRoundedIcon fontSize="small" />
              </MenuItem>

              {NAV.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={() => setAnchorEl(null)}
                >
                  <NavLink
                    to={item.to}
                    className="w-full text-center py-1.5 hover:text-orange-500"
                  >
                    {item.label}
                  </NavLink>
                </MenuItem>
              ))}

              <MenuItem onClick={() => setAnchorEl(null)}>
                <NavLink
                  to="/get-quote"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-center hover:text-orange-500"
                >
                  Get Quote
                </NavLink>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
