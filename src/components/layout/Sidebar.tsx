import { Layout, Menu, Badge, Button } from "antd";
import {
  BarChartOutlined,
  CheckSquareOutlined,
  UserOutlined,
  MessageOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Sider } = Layout;

const navigation = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <BarChartOutlined className="w-5 h-5" />,
    current: false,
  },
  {
    key: "tasks",
    label: "Tasks",
    icon: <CheckSquareOutlined className="w-5 h-5" />,
    current: true,
    children: [
      { key: "pending", label: "Pending", current: true },
      { key: "completed", label: "Completed", current: false },
      { key: "archived", label: "Archived", current: false },
    ],
  },
  {
    key: "patients",
    label: "Patients",
    icon: <UserOutlined className="w-5 h-5" />,
    current: false,
  },
  {
    key: "messages",
    label: "Messages",
    icon: <MessageOutlined className="w-5 h-5" />,
    current: false,
    badge: "3",
  },
  {
    key: "appointments",
    label: "Appointments",
    icon: <CalendarOutlined className="w-5 h-5" />,
    current: false,
  },
  {
    key: "billing",
    label: "Billing",
    icon: <FileTextOutlined className="w-5 h-5" />,
    current: false,
  },
  {
    key: "management",
    label: "Management",
    icon: <SettingOutlined className="w-5 h-5" />,
    current: false,
  },
];

export const Sidebar = () => {
  const menuItems: MenuProps["items"] = navigation.map((item) => {
    const menuItem: NonNullable<MenuProps["items"]>[0] = {
      key: item.key,
      icon: item.icon,
      label: item.badge ? (
        <div className="flex items-center justify-between w-full">
          <span>{item.label}</span>
          <Badge count={item.badge} size="small" className="ml-2" />
        </div>
      ) : (
        item.label
      ),
      className: item.current ? "ant-menu-item-selected" : "",
    };

    if (item.children) {
      (
        menuItem as NonNullable<MenuProps["items"]>[0] & {
          children: NonNullable<MenuProps["items"]>;
        }
      ).children = item.children.map((child) => ({
        key: child.key,
        label: child.label,
        className: child.current ? "ant-menu-item-selected" : "",
      }));
    }

    return menuItem;
  });

  return (
    <Sider width={256} className="bg-white border-r border-gray-200 h-full">
      <div className="flex flex-col h-full">
        <Menu
          mode="inline"
          defaultOpenKeys={["tasks"]}
          selectedKeys={["pending"]}
          items={menuItems}
          className="border-none bg-transparent flex-1 text-sm font-medium"
          theme="light"
        />

        <div className="p-3 border-t border-gray-200">
          <Button
            type="text"
            icon={<QuestionCircleOutlined className="w-4 h-4" />}
            className="flex items-center w-full justify-start text-sm text-gray-700 hover:text-gray-900 h-11 font-normal"
          >
            Support
          </Button>
        </div>
      </div>
    </Sider>
  );
};
