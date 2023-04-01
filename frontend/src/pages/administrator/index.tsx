import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "@/lib/hooks/auth";
import { api } from "@/utils/api";
import AdministratorLayout from "@/layouts/Dashboards/Aministrator";

export default function AdministratorHome() {

  return (
    <AdministratorLayout>
      <div className="">AministratorHome</div>
    </AdministratorLayout>
  );
}
