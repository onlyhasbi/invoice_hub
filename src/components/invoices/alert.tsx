import { check, close } from "@/src/assets";
import { PromiseStatus } from "@/src/lib/types/invoice";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  status: PromiseStatus;
  title?: string;
  message?: string;
  isVisible: boolean;
};

function Alert({ status, title, message, isVisible }: Props) {
  const [visible, setVisible] = useState(isVisible);
  const getStyles = {
    success: {
      background: "#E1F9F0",
      borderLeft: "#34D399",
      titleColor: "#004434",
      descriptionColor: "#637381",
      icon: check,
    },
    error: {
      background: "#FFEBEE",
      borderLeft: "#F44336",
      titleColor: "#B71C1C",
      descriptionColor: "#8D6E63",
      icon: close,
    },
  };

  useEffect(() => {
    let visibleTimeout: NodeJS.Timeout;
    visibleTimeout = setTimeout(() => {
      setVisible(!visible);
    }, 3000);
    return () => clearTimeout(visibleTimeout);
  }, [isVisible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`flex gap-[30px] px-10 pt-7 pb-8 rounded border-l-8 items-start`}
      style={{
        background: getStyles[status].background,
        borderColor: getStyles[status].borderLeft,
      }}
    >
      <Image
        src={getStyles[status].icon}
        width={32}
        height={32}
        alt={`icon-${status}`}
      />
      <div className="flex flex-col gap-2">
        {title && (
          <h4
            className={`leading-[22px] font-bold`}
            style={{ color: getStyles[status].titleColor }}
          >
            {title}
          </h4>
        )}
        {message && (
          <p
            className={`leading-6`}
            style={{ color: getStyles[status].descriptionColor }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Alert;
