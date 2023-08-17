import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import type { SafeUser } from "~/schemas/user/SafeUser";

type UserChipProps = {
  hideName?: boolean;
} & SafeUser &
  HTMLAttributes<HTMLElement>;

const UserChip = ({ id, name, image, hideName, ...props }: UserChipProps) => {
  return (
    <div
      {...props}
      className={clsx("flex items-center gap-1", props.className)}
    >
      <div className="avatar w-8">
        <Image
          className="mask mask-squircle"
          src={image ?? ""}
          width={16}
          height={16}
          alt=""
        />
      </div>
      {!hideName && <Link href={`/profile/${id}`}>{`@${name ?? "???"}`}</Link>}
    </div>
  );
};

export default UserChip;
