"use client";

import React from "react";
import { getCookie, setCookie } from "cookies-next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MonitorCog, ShieldPlus, UserPlus, Eye, EyeOff } from "lucide-react";
import useShowPassword from "@/lib/custom_hooks/useShowPassword";
import { useRouter } from "next/navigation";

interface Form {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles: string[];
  mobile: string;
  position: string;
}

export default function LoginComponent() {
  const { showPassword, togglePasswordVisibility } = useShowPassword();
  const [isSignUp, setIsSignUp] = React.useState(true);
  const [form, setForm] = React.useState<Form>({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    roles: [],
    mobile: "",
    position: "",
  });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleRoleChange = (roles: string) => {
    let newRoles = ["user"];
    if (roles === "admin") {
      newRoles.push("admin");
    } else if (roles === "moderator") {
      newRoles.push("admin", "moderator");
    }
    setForm((prev) => ({ ...prev, roles: newRoles }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { confirmPassword, ...formDataWithoutConfirmPassword } = form;
    if (isSignUp) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataWithoutConfirmPassword),
          }
        );
        const data = await res.json();
        if(res.ok){
          setCookie("token", data.token, {
            maxAge: 24 * 60 * 60 * 7,
            path: "/",
          });
          alert("DONE")
          router.push("/info/debug/debug-cookie-header");
        }else{
          console.log("The Response from the server is :",data);
        }
      } catch (error : any) {
        console.error("Error:", error.message);
        throw new Error("Error:", error.message);
      }

    }else if(!isSignUp){
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithoutConfirmPassword),
        });
        const data = await res.json();
        if(res.ok){
          setCookie("token", data.token, {
            maxAge: 24 * 60 * 60 * 7,
            path: "/",
          });
          router.push("/info/design-system");
        }else{
          console.log("The Response from the server is :",data);
        }
      } catch (error : any) {
        console.error('Error:', error.message);
        throw new Error("Error:", error.message);
      }

    }else{
      // EXPLAIN - เหี้ยสุด คือไม่รู้ว่ามันคืออะไร พ่น Error มาถูกป่าวก็ไม่แน่ใจ
      console.log("Internal Error: Something went wrong");
      return;
    }
  };
//DEBUG - ตรวจสอบว่ามี token หรือไม่  
React.useEffect(() => {
    const token = getCookie('token');
    console.log('Token from cookie:', token);
  }, []);


  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/index_assets/Blur-bg.jpg')] bg-cover bg-center w-full">
      <div
        className="absolute inset-0 backdrop-blur-md bg-white/30"
        aria-hidden="true"
      />
      <div className="w-full max-w-6xl bg-white/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden relative z-10">
        <div className="flex flex-col md:flex-row">
          {/* Right column - Image and text */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center bg-transparent">
            <div className="text-center md:text-start mb-8">
              <h2 className="text-3xl font-bold mb-2">
                NEED | Enterprise Resource Planning
              </h2>
              <h2 className="text-3xl font-bold text-primary dark:text-primary mb-2">
                NEED
              </h2>
              <h2 className="text-3xl font-bold mb-2">SHOPPING</h2>
            </div>
            <svg
              className="w-64 h-64 text-primary dark:text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="16" y="16" width="6" height="6" rx="1" />
              <rect x="2" y="16" width="6" height="6" rx="1" />
              <rect x="9" y="2" width="6" height="6" rx="1" />
              <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
              <path d="M12 12V8" />
            </svg>
          </div>
          {/* Left column - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-1">
              NEED | Enterprise Resource Planning
            </h1>
            <p className="text-secondary mb-6">
              โปรแกรมบริหารจัดการทรัพยากรณ์และการขายต่างๆ สำหรับ Need Shopping
              เท่านั้น
            </p>
            <div className="space-x-4 mb-6">
              <button
                className={`font-semibold ${
                  isSignUp
                    ? "text-primary dark:text-primary border-b-2 border-border dark:border-border"
                    : "text-primary dark:text-primary"
                }`}
                onClick={() => setIsSignUp(true)}
              >
                ขออนุญาตเข้าใช้งาน
              </button>
              <button
                className={`font-semibold ${
                  !isSignUp
                    ? "text-primary dark:text-primary border-b-2 border-primary dark:border-primary"
                    : "text-primary dark:text-primary"
                }`}
                onClick={() => setIsSignUp(false)}
              >
                เข้าสู่ระบบ
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isSignUp && (
                <>
                  <div>
                    <Label htmlFor="firstName">ชื่อจริง</Label>
                    <Input
                      type="text"
                      id="firstName"
                      placeholder="ชื่อจริง"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">นามสกุล</Label>
                    <Input
                      type="text"
                      id="lastName"
                      placeholder="นามสกุล"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              <div>
                <Label htmlFor="email">อีเมล</Label>
                <div className="relative">
                  <Input
                    type="email"
                    id="email"
                    placeholder="อีเมล"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  กรุณากรอกอีเมลของคุณ
                </p>
              </div>
              <div className="">
                <Label htmlFor="password">รหัสผ่าน</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder={showPassword ? "รหัสผ่าน" : "รหัสผ่าน"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
                <div className="flex justify-items-start items-center">
                  <p className="text-xs text-gray-600 mt-1">
                    กรุณากรอกรหัสผ่านของคุณอย่างน้อย 8 ตัวอักษร&nbsp;|
                  </p>
                  <Button
                    type="button"
                    onClick={togglePasswordVisibility}
                    variant="ghost"
                    className="flex items-center text-sm gap-2"
                  >
                    <p className="text-xs text-gray-600 mt-1 prm-l">
                      แสดงรหัสผ่าน
                    </p>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Button>
                </div>
              </div>
              {isSignUp && (
                <div className="flex flex-col gap-2 space-y-2">
                  <div>
                    <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder={showPassword ? "รหัสผ่าน" : "รหัสผ่าน"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile">เบอร์โทรศัพท์</Label>
                    <Input
                      type="text"
                      id="mobile"
                      placeholder="เบอร์โทรศัพท์"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">ตำแหน่ง</Label>
                    <Input
                      type="text"
                      id="position"
                      placeholder="ตำแหน่ง"
                      name="position"
                      value={form.position}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center border border-border rounded-md p-2">
                        <ShieldPlus
                          size={36}
                          strokeWidth={2.5}
                          className="w-4 h-4 mr-2"
                        />
                        <p className="text-sm prm-sb">สิทธิ์การใช้งาน</p>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        <DropdownMenuLabel>
                          <h5 className="text-sm prm-sb">Select Roles</h5>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="space-x-2"
                          onClick={() => handleRoleChange("user")}
                        >
                          <UserPlus size={18} strokeWidth={2.5} />
                          <p className="text-sm prm-l">ผู้ใช้ | User</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="space-x-2"
                          onClick={() => handleRoleChange("admin")}
                        >
                          <UserPlus size={18} strokeWidth={2.5} />
                          <p className="text-sm prm-l">เจ้าหน้าที่ | Admin</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="space-x-2"
                          onClick={() => handleRoleChange("moderator")}
                        >
                          <UserPlus size={18} strokeWidth={2.5} />
                          <p className="text-sm prm-l">
                            ผู้ดูแลระบบ | Moderator
                          </p>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="space-x-2" disabled>
                          <MonitorCog size={18} strokeWidth={2.5} />
                          <p className="text-sm prm-l">ผู้พัฒนา | Developer</p>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <p className="text-sm prm-sb text-chart-3 dark:text-chart-3 mt-1">
                      {form.roles.join(", ")}
                    </p>
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-600">
                หากพบปัญหาในการใช้งานระบบ กรุณาติดต่อ Developer ที่&nbsp;
                <a
                  href="mailto:sarawut.khan@hotmail.com"
                  className="underline underline-offset-4"
                >
                  แจ้งปัญหาการใช้งาน
                </a>
              </p>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-secondary text-white"
              >
                {isSignUp ? "สร้างรหัสผ่าน" : "เข้าสู่ระบบ"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
