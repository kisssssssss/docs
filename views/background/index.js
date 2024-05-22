import Sky from "@/views/background/Sky";
import Plum from "@/views/background/Plum";
import WebGL from "@/views/background/WebGL";
import Wave from "@/views/background/Wave";
import BlackGrid from "@/views/background/BlackGrid";
import BlackGridLarge from "@/views/background/BlackGrid.large";
import WhiteGrid from "@/views/background/WhiteGrid";

export default function Background({ theme }) {
  return (
    <>
      {
        {
          sky: <Sky />,
          plum: <Plum />,
          vortex: <WebGL />,
          whiteGrid: <WhiteGrid />,
          blackGrid: <BlackGrid />,
          blackGridLarge: <BlackGridLarge />,
          wave: <Wave />,
          null: <></>,
        }[theme]
      }
    </>
  );
}
