export type CardItemHostPage = {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  iconBg: string;
  iconColor: string;
};

export const steps = [
  { id: 1, label: "Personal Info", active: true },
  { id: 2, label: "Pending" },
  { id: 3, label: "Success" },
];
