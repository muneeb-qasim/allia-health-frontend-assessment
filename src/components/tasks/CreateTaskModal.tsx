import { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Tag as AntTag,
  Space,
  Typography,
  Card,
} from "antd";
import { CreateTaskData, Priority, Status } from "@/types/task";
import { Plus, Calendar, User, Flag, Tag } from "lucide-react";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;

interface FormValues {
  title: string;
  assignedTo: string;
  priority: Priority;
  status: Status;
  dueOn: dayjs.Dayjs;
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTaskData) => Promise<void>;
  loading: boolean;
  availableUsers: Array<{ id: string; name: string }>;
}

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const statusOptions = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "in_review", label: "In Review" },
  { value: "done", label: "Done" },
];

export const CreateTaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  availableUsers,
}: CreateTaskModalProps) => {
  const [form] = Form.useForm();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      form.resetFields();
      setTagInput("");
      setTags([]);
      // Set default values
      form.setFieldsValue({
        priority: "medium",
        status: "todo",
        dueOn: dayjs().add(7, "day"),
        assignedTo: availableUsers[0]?.id || "",
      });
    }
  }, [isOpen, availableUsers, form]);

  const handleSubmit = async (values: FormValues) => {
    try {
      const formData: CreateTaskData = {
        title: values.title,
        assignedTo: values.assignedTo,
        priority: values.priority,
        status: values.status,
        dueOn: values.dueOn.format("YYYY-MM-DD"),
        tags: tags,
      };

      await onSubmit(formData);
      onClose();
    } catch {
      // Error handling is done in the parent component
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && !tags.includes(tag)) {
        setTags((prev) => [...prev, tag]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Modal
      title={
        <Title level={4} className="m-0 text-gray-800! text-lg font-semibold">
          Create New Task
        </Title>
      }
      open={isOpen}
      onCancel={onClose}
      width={1000}
      footer={null}
      destroyOnHidden
      className="create-task-modal"
    >
      <Card className="bg-gradient-to-br! from-teal-50! to-blue-50! border-0 rounded-lg!">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          size="large"
        >
          <Form.Item
            label="Task Title"
            name="title"
            rules={[{ required: true, message: "Please enter task title!" }]}
          >
            <Input placeholder="Enter a descriptive task title" size="large" />
          </Form.Item>

          <Form.Item
            label={
              <Space>
                <User className="w-4 h-4 text-gray-500" />
                Assigned To
              </Space>
            }
            name="assignedTo"
            rules={[
              { required: true, message: "Please select assigned user!" },
            ]}
          >
            <Select placeholder="Select user">
              {availableUsers.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Priority & Status" className="mb-0">
            <Space.Compact className="w-full gap-2">
              <Form.Item
                name="priority"
                className="w-1/2 mb-0"
                label={
                  <Space>
                    <Flag className="w-4 h-4 text-gray-500" />
                    Priority
                  </Space>
                }
              >
                <Select>
                  {priorityOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="status" className="w-1/2 mb-0" label="Status">
                <Select>
                  {statusOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Space.Compact>
          </Form.Item>

          <Form.Item
            label={
              <Space>
                <Calendar className="w-4 h-4 text-gray-500" />
                Due Date
              </Space>
            }
            name="dueOn"
            rules={[{ required: true, message: "Please select due date!" }]}
          >
            <DatePicker
              className="w-full"
              placeholder="Select due date"
              allowClear
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
          </Form.Item>

          <Form.Item
            label={
              <Space>
                <Tag className="w-4 h-4 text-gray-500" />
                Tags
              </Space>
            }
          >
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type and press Enter to add tags"
            />
            {tags.length > 0 && (
              <div className="mt-2">
                {tags.map((tag) => (
                  <AntTag
                    key={tag}
                    closable
                    onClose={() => handleRemoveTag(tag)}
                    color="blue"
                    className="mb-1"
                  >
                    {tag}
                  </AntTag>
                ))}
              </div>
            )}
          </Form.Item>

          <Form.Item className="mb-0 mt-6">
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-teal-600! hover:bg-teal-600! border-teal-600! hover:border-teal-600! h-10! rounded-md! font-medium! text-white!"
              >
                {loading ? "Creating..." : "Create Task"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};
