import { Layout, Button, Badge, Avatar, Space } from "antd";
import { BellOutlined, PlusOutlined } from "@ant-design/icons";

const { Header } = Layout;

export const Topbar = () => {
  return (
    <Header className="bg-white border-t border-gray-300 shadow-sm px-6 py-4 w-full h-16 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">A</span>
        </div>
        <h1 className="text-xl font-semibold text-teal-600 m-0">
          Allia Health
        </h1>
      </div>

      <div className="flex-1"></div>

      <Space size="large" className="flex items-center">
        <Badge
          count={3}
          size="small"
          className="[&_.ant-badge-count]:bg-red-500 [&_.ant-badge-count]:text-white [&_.ant-badge-count]:text-xs [&_.ant-badge-count]:min-w-[18px] [&_.ant-badge-count]:h-[18px] [&_.ant-badge-count]:leading-[18px] [&_.ant-badge-count]:-top-1 [&_.ant-badge-count]:-right-1"
        >
          <Button
            type="text"
            icon={<BellOutlined className="w-4 h-4 text-gray-700! " />}
            className="border border-gray-200 rounded-lg w-9 h-9 flex items-center justify-center shadow-none p-0"
          />
        </Badge>

        <Button
          type="primary"
          icon={<PlusOutlined className="w-4 h-4 text-white!" />}
          onClick={() => console.log("Patient creation not implemented")}
          className="bg-teal-600! hover:bg-teal-600! border-teal-600! hover:border-teal-600! h-10! rounded-md! font-medium! text-white!"
        >
          New Patient
        </Button>

        <Avatar
          size={40}
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
          className="cursor-pointer"
        />
      </Space>
    </Header>
  );
};
