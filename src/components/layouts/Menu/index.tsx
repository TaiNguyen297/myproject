/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { NestedMenuItem } from "mui-nested-menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import GetAppIcon from '@mui/icons-material/GetApp';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

type MenuSectionProps = {
  menuData: {
    name: string;
    path: string;
    subMenus?: {
      name: string;
      path?: string;
      subMenu2?: { name: string; path: string }[];
    }[];
  };
};

const MenuSection: React.FC<MenuSectionProps> = ({ menuData }) => {
  const menuRef = useRef<HTMLDivElement | null | undefined>();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    isNotHover?: boolean
  ) => {
    if (isNotHover && menuData.path) {
      router.push(menuData.path);
      return;
    }
    if (anchorEl) return;
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    if (!anchorEl) return;
    setAnchorEl(null);
  };

  //download pdf
  const handleDownloadPDF = async () => {
    const pdf1 = new jsPDF('p', 'mm', 'a4');
    const element1 = document.getElementById('resume');
  
    if (element1) {
      const canvas1 = await html2canvas(element1);
      const imgData1 = canvas1.toDataURL('image/png');
      const imgProps1 = pdf1.getImageProperties(imgData1);
      const pdfWidth1 = pdf1.internal.pageSize.getWidth();
      const pdfHeight1 = (imgProps1.height * pdfWidth1) / imgProps1.width;
  
      pdf1.addImage(imgData1, 'PNG', 0, 0, pdfWidth1, pdfHeight1);
      pdf1.save("resume.pdf");
    }
  
    const pdf2 = new jsPDF('p', 'mm', 'a4');
    const element2 = document.getElementById('project');
  
    if (element2) {
      const canvas2 = await html2canvas(element2);
      const imgData2 = canvas2.toDataURL('image/png');
      const imgProps2 = pdf2.getImageProperties(imgData2);
      const pdfWidth2 = pdf2.internal.pageSize.getWidth();
      const pdfHeight2 = (imgProps2.height * pdfWidth2) / imgProps2.width;
  
      pdf2.addImage(imgData2, 'PNG', 0, 0, pdfWidth2, pdfHeight2);
      pdf2.save("project.pdf");
    }
  };
  

  useEffect(() => {
    const handleMenuMouseEnter = () => {
      if (!anchorEl) return;
      setAnchorEl(null);
    };

    if (menuRef.current) {
      menuRef.current.addEventListener("mouseenter", handleMenuMouseEnter);
    }

    return () => {
      if (menuRef.current) {
        menuRef.current.removeEventListener("mouseenter", handleMenuMouseEnter);
      }
    };
  }, [anchorEl]);

  return (
    <Box>
      <Box>
        <Button
          ref={buttonRef}
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleClick(e, true)
          }
          onMouseOver={handleClick}
          onMouseLeave={handleClose}
          sx={{
            zIndex: 9999999,
            whiteSpace: "nowrap",
            cursor: "pointer",
            color: "black",
            "&:hover": {
              color: "lightGreen",
            },
          }}
        >
          {menuData.name}
        </Button>
      </Box>

      {!!menuData.subMenus && (
        <Box>
          <Menu
            MenuListProps={{
              onMouseLeave: handleClose,
              onMouseOver: () => setAnchorEl(buttonRef.current),
            }}
            id="simple-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {menuData.subMenus.map((subMenu) => {
              if (subMenu.subMenu2) {
                return (
                  <NestedMenuItem
                    key={subMenu.name}
                    label={subMenu.name}
                    parentMenuOpen={open}
                  >
                    {subMenu.subMenu2.map((item) => (
                      <Link key={item.name} href={item.path}>
                        <MenuItem data-value={"sub-menu-item"}>
                          {item.name}
                        </MenuItem>
                      </Link>
                    ))}
                  </NestedMenuItem>
                );
              }

              if (subMenu.name === 'Download PDF') {
                return (
                  <MenuItem onClick={handleDownloadPDF} sx={{ marginLeft: -0.5 }}>
                    <GetAppIcon /> {subMenu.name}
                  </MenuItem>
                );
              }

              return (
                <Link key={subMenu.name} href={subMenu.path ?? ""}>
                  <MenuItem onClick={handleClose} sx={{ marginLeft: -0.5 }}>
                    {subMenu.name}
                  </MenuItem>
                </Link>
              );
            })}
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default MenuSection;
