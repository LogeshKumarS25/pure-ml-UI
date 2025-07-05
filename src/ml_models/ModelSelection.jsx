import React from "react";
import "./ModelSelection.css";

const ModelSelection = () => (
  <div className="model-root">
    <aside className="model-sidebar">
      <div className="sidebar-header">
        <div className="user-avatar">🟢</div>
        <div>
          <div className="user-name">None</div>
          <div className="user-files">My Files</div>
        </div>
      </div>
      <div className="sidebar-section">
        <button className="sidebar-btn active">Model Registry</button>
        <div className="sidebar-sub">
          <div>📊 Classifications</div>
          <div>📈 Regression</div>
          <div className="wip">📉 Time Series <span className="wip-label">WIP</span></div>
        </div>
      </div>
      <div className="sidebar-section">
        <button className="sidebar-btn">Play Ground</button>
        <div className="sidebar-sub">
          <div>📚 Documentation</div>
          <div className="wip">🛠️ API Services <span className="wip-label">WIP</span></div>
        </div>
      </div>
      <button className="sidebar-subscribe">Subscribe To Access All</button>
    </aside>
    <main className="model-main">
      <div className="model-header">
        <h2>Models</h2>
        <div className="model-breadcrumb">Model-Registry / Analysis</div>
      </div>
      <div className="model-upload-card">
        <h3>Upload Your Dataset</h3>
        <p className="model-upload-desc">Start Analysing</p>
        <button className="model-upload-btn">Upload File</button>
      </div>
    </main>
  </div>
);

export default ModelSelection;