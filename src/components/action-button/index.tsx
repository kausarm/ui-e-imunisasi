import React from "react";
import {
  EyeIcon,
  PencilIcon,
  PlusIcon,
  SaveIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import PropTypes from "prop-types";

interface ActionButtonProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  hideView?: boolean;
  hideEdit?: boolean;
  hideDelete?: boolean;
  plus?: boolean;
  loading?: boolean;
  save?: boolean;
  noMargin?: boolean;
  type?: any;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onView,
  onEdit,
  onDelete,
  plus,
  hideView,
  hideEdit,
  hideDelete,
  save,
  onSave,
  type,
  noMargin,
}) => {
  return (
    <div className={`flex ${noMargin ? "" : "space-x-5"} wrapper__button`}>
      {save && (
        <Button
          type={type}
          variant="secondary"
          size="icon"
          className="text-white bg-secondary hover:bg-blue-500 hover:text-white"
          onClick={onSave}
        >
          <SaveIcon className="w-4 h-4 text-white " />
          {/* {loading ? 'Saving...' : 'Simpan'} */}
        </Button>
      )}
      <Button
        type={type}
        variant="outline"
        className={hideView ? "hidden" : "bg-secondary hover:bg-blue-500"}
        size="icon"
        onClick={onView}
      >
        {plus ? (
          <PlusIcon className="w-4 h-4 text-white " />
        ) : (
          <EyeIcon className="w-4 h-4 text-white " />
        )}
      </Button>
      <Button
        type={type}
        onClick={onEdit}
        variant="outline"
        className={hideEdit ? "hidden" : "bg-yellow-400 hover:bg-yellow-300"}
        size="icon"
      >
        <PencilIcon className="w-4 h-4 text-white" />
      </Button>
      <Button
        type={type}
        onClick={onDelete}
        variant="outline"
        className={hideDelete ? "hidden" : "bg-red-500 hover:bg-red-500"}
        size="icon"
      >
        <TrashIcon className="w-4 h-4 text-white" />
      </Button>
    </div>
  );
};

ActionButton.propTypes = {
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
  hideView: PropTypes.bool,
  hideEdit: PropTypes.bool,
  hideDelete: PropTypes.bool,
  plus: PropTypes.bool,
  loading: PropTypes.bool,
  save: PropTypes.bool,
  noMargin: PropTypes.bool,
  type: PropTypes.any,
};

export default ActionButton;
