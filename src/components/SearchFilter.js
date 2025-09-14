// src/components/SearchFilter.js
import React from 'react';

export default function SearchFilter({ search, setSearch, category, setCategory, categories }) {
  return (
    <div className="mb-4">
      <div className="row g-2 align-items-center">
        <div className="col-12 col-md-6">
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-search"></i></span>
            <input
              type="search"
              className="form-control"
              placeholder="Search events by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-md-6 d-flex flex-wrap gap-2">
          {/* Category buttons */}
          <div className="d-flex flex-wrap align-items-center">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`btn btn-sm ${category === c ? 'btn-primary' : 'btn-outline-secondary'}`}
                style={{ marginRight: 6, marginBottom: 6 }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
