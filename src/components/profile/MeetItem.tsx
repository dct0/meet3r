import Link from "next/link";
import type { MeetsWithProfile } from "~/schemas/meet/ListMeets";
import UserChip from "../ui/UserChip";

const MeetItem = ({
  id,
  name,
  description,
  location,
  createdBy,
  allowedDates,
}: MeetsWithProfile[number]) => {
  const openModal = () => {
    console.log("open modal");
  };

  return (
    <li>
      <article className="sm:field-container p-4 sm:my-2">
        <header className="mb-2 flex items-center justify-between">
          <UserChip {...createdBy} />

          <h3 className="link-hover link-primary link text-xl font-semibold">
            <Link href={`/meet/${id}`}>{name}</Link>
          </h3>

          <div className="flex flex-col items-end">
            <a className="flex items-center gap-1" onClick={openModal}>
              <span className="link-hover link">
                {allowedDates.at(0)?.toLocaleDateString()}
              </span>
              <span className="badge badge-accent badge-xs h-4 cursor-pointer font-semibold hover:bg-accent-focus">{`+${
                allowedDates.length - 1
              }`}</span>
            </a>
          </div>
        </header>
        <p>{description}</p>
        <p>{location}</p>
      </article>
    </li>
  );
};

export default MeetItem;
