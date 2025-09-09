import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button as AntButton } from "antd";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "color"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const getAntButtonType = ():
    | "primary"
    | "default"
    | "text"
    | "link"
    | "dashed" => {
    switch (variant) {
      case "primary":
        return "primary";
      case "secondary":
        return "default";
      case "outline":
        return "default";
      case "ghost":
        return "text";
      default:
        return "primary";
    }
  };

  const getAntButtonSize = () => {
    switch (size) {
      case "sm":
        return "small";
      case "md":
        return "middle";
      case "lg":
        return "large";
      default:
        return "middle";
    }
  };

  const getButtonStyle = () => {
    const baseStyle = {
      fontWeight: 500,
    };

    switch (variant) {
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: "#f5f5f5",
          borderColor: "#d9d9d9",
          color: "#262626",
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderColor: "#d9d9d9",
          color: "#262626",
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderColor: "transparent",
          color: "#262626",
        };
      default:
        return baseStyle;
    }
  };

  return (
    <AntButton
      type={getAntButtonType()}
      size={getAntButtonSize()}
      loading={loading}
      disabled={disabled}
      className={className}
      style={getButtonStyle()}
      {...props}
    >
      {children}
    </AntButton>
  );
};
