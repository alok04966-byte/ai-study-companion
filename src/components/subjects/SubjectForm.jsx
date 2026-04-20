import { useForm } from "react-hook-form";
import { useStudy } from "../../context/StudyContext";
import * as yup from "yup";
import { toast } from "react-toastify";

const subjectSchema = yup.object({
  name: yup.string().required("Subject name is required"),
  description: yup.string().max(140, "Description should be under 140 characters"),
});

function SubjectForm() {
  const { register, handleSubmit, reset } = useForm();
  const { addSubject } = useStudy();

  const onSubmit = (data) => {
    try {
      subjectSchema.validateSync(data);
      addSubject(data);
      reset();
      toast.success("Subject added");
    } catch (error) {
      toast.error(error.message || "Invalid subject data");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="panel form-grid">
      <div className="field">
        <label htmlFor="subject-name">Subject Name</label>
        <input
          id="subject-name"
          className="input"
          {...register("name", { required: true })}
          placeholder="e.g. Data Structures"
        />
      </div>

      <div className="field">
        <label htmlFor="subject-description">Description</label>
        <input
          id="subject-description"
          className="input"
          {...register("description")}
          placeholder="Short description"
        />
      </div>

      <div className="field">
        <label htmlFor="subject-color">Color</label>
        <input
          id="subject-color"
          className="input"
          {...register("color")}
          type="color"
        />
      </div>

      <div className="field field-end">
        <label>&nbsp;</label>
        <button type="submit" className="btn btn-primary">
          Add Subject
        </button>
      </div>
    </form>
  );
}

export default SubjectForm;