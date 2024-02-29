import css from "./LoadMoreButton.module.css";

type Props = {
  text?: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

export const LoadMoreButton = ({
  text,
  onClick,
  disabled,
  isLoading,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={isLoading ? css.visuallyHidden : css.buttonLoadMore}
      disabled={disabled}
    >
      {disabled ? "No more images" : text}
    </button>
  );
};
