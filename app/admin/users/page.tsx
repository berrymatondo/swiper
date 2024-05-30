import { prisma } from "@/lib/prisma";
import React from "react";

const UsersPage = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      //email: true,
      role: true,
      status: true,
    },
  });
  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user?.username}</p>
      ))}
    </div>
  );
};

export default UsersPage;
