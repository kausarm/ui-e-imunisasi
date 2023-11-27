function SelectYear({ onChange, defaultValue }: any) {
  const startYear = 2002;
  const endYear = 2026;

  const yearOptions = [];

  for (let year = startYear; year <= endYear; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  return (
    <div>
      <select
        name="selectedYear"
        defaultValue={defaultValue}
        id="selectedYear"
        onChange={onChange}
        className="p-2 rounded-lg bg-secondary"
      >
        <option key={213244224} value="null">
          Pilih Tahun Filter
        </option>
        {yearOptions}
      </select>
    </div>
  );
}

export default SelectYear;
