import { Component } from '@angular/core';
import {
  UiScheduleComponent,
  ScheduleConfig
} from '@shared/component-library';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [UiScheduleComponent],
  template: `
    <div class="mb-4">
      <h2 class="fw-bold">UiSchedule</h2>
      <p class="text-muted">
        A config-driven wrapper around the Syncfusion EJ2 Scheduler. Pass a single
        <code>ScheduleConfig</code> object to control views, events, working hours,
        and display options.
      </p>
    </div>

    <!-- Import -->
    <div class="mb-4">
      <h5 class="section-title">Import</h5>
      <div class="code-block">import &#123; UiScheduleComponent, ScheduleConfig &#125; from '&#64;shared/component-library';</div>
    </div>

    <!-- Week View (default) -->
    <div class="mb-5">
      <h5 class="section-title">Week View (default)</h5>
      <p class="text-muted small mb-3">Standard week view with working hours and sample events.</p>
      <div class="preview-box p-0">
        <ui-schedule [config]="weekConfig"></ui-schedule>
      </div>
      <div class="code-block">weekConfig: ScheduleConfig = &#123;
  currentView: 'Week',
  views: ['Day', 'Week', 'WorkWeek', 'Month'],
  selectedDate: new Date(),
  startHour: '08:00',
  endHour: '18:00',
  events: [...],
&#125;;</div>
    </div>

    <!-- Month View -->
    <div class="mb-5">
      <h5 class="section-title">Month View</h5>
      <p class="text-muted small mb-3">Calendar month view with weekend hidden.</p>
      <div class="preview-box p-0">
        <ui-schedule [config]="monthConfig"></ui-schedule>
      </div>
      <div class="code-block">monthConfig: ScheduleConfig = &#123;
  currentView: 'Month',
  views: ['Month', 'Agenda'],
  showWeekend: false,
  firstDayOfWeek: 1,
  events: [...],
&#125;;</div>
    </div>

    <!-- API Reference -->
    <div class="mb-4">
      <h5 class="section-title">ScheduleConfig API Reference</h5>
      <div class="table-responsive">
        <table class="table table-bordered table-sm">
          <thead class="table-dark">
            <tr>
              <th>Property</th><th>Type</th><th>Default</th><th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>events</code></td><td><code>ScheduleEventConfig[]</code></td><td><code>[]</code></td><td>Calendar events</td></tr>
            <tr><td><code>views</code></td><td><code>ScheduleView[]</code></td><td><code>['Day','Week','WorkWeek','Month','Agenda']</code></td><td>Available view tabs</td></tr>
            <tr><td><code>currentView</code></td><td><code>ScheduleView</code></td><td><code>'Week'</code></td><td>Active view on load</td></tr>
            <tr><td><code>selectedDate</code></td><td><code>Date</code></td><td>today</td><td>Initially focused date</td></tr>
            <tr><td><code>height</code></td><td><code>string</code></td><td><code>'550px'</code></td><td>Component height</td></tr>
            <tr><td><code>startHour</code></td><td><code>string</code></td><td><code>'08:00'</code></td><td>Work day start (HH:mm)</td></tr>
            <tr><td><code>endHour</code></td><td><code>string</code></td><td><code>'18:00'</code></td><td>Work day end (HH:mm)</td></tr>
            <tr><td><code>firstDayOfWeek</code></td><td><code>number</code></td><td><code>0</code></td><td>0 = Sunday, 1 = Monday</td></tr>
            <tr><td><code>showWeekend</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Show weekend columns</td></tr>
            <tr><td><code>showHeaderBar</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Show the top toolbar</td></tr>
            <tr><td><code>showTimeIndicator</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Show current-time line</td></tr>
            <tr><td><code>timeScale</code></td><td><code>number</code></td><td><code>30</code></td><td>Slot duration in minutes</td></tr>
            <tr><td><code>minDate</code></td><td><code>Date</code></td><td>—</td><td>Minimum navigable date</td></tr>
            <tr><td><code>maxDate</code></td><td><code>Date</code></td><td>—</td><td>Maximum navigable date</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ScheduleEventConfig API -->
    <div class="mb-4">
      <h5 class="section-title">ScheduleEventConfig API Reference</h5>
      <div class="table-responsive">
        <table class="table table-bordered table-sm">
          <thead class="table-dark">
            <tr>
              <th>Property</th><th>Type</th><th>Required</th><th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>Id</code></td><td><code>number | string</code></td><td>✓</td><td>Unique event identifier</td></tr>
            <tr><td><code>Subject</code></td><td><code>string</code></td><td>✓</td><td>Event title</td></tr>
            <tr><td><code>StartTime</code></td><td><code>Date</code></td><td>✓</td><td>Event start date/time</td></tr>
            <tr><td><code>EndTime</code></td><td><code>Date</code></td><td>✓</td><td>Event end date/time</td></tr>
            <tr><td><code>IsAllDay</code></td><td><code>boolean</code></td><td>—</td><td>Spans the full day</td></tr>
            <tr><td><code>CategoryColor</code></td><td><code>string</code></td><td>—</td><td>Hex colour for the event block</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ScheduleShowcaseComponent {

  private readonly today = new Date();
  private readonly y = this.today.getFullYear();
  private readonly m = this.today.getMonth();

  readonly weekConfig: ScheduleConfig = {
    currentView: 'Week',
    views: ['Day', 'Week', 'WorkWeek', 'Month'],
    selectedDate: this.today,
    startHour: '08:00',
    endHour: '18:00',
    height: '520px',
    events: [
      { Id: 1,  Subject: 'Team Standup',         StartTime: new Date(this.y, this.m, this.today.getDate(),      9,  0), EndTime: new Date(this.y, this.m, this.today.getDate(),      9, 30) },
      { Id: 2,  Subject: 'Sprint Planning',       StartTime: new Date(this.y, this.m, this.today.getDate(),     10,  0), EndTime: new Date(this.y, this.m, this.today.getDate(),     12,  0) },
      { Id: 3,  Subject: 'Design Review',         StartTime: new Date(this.y, this.m, this.today.getDate() + 1, 14,  0), EndTime: new Date(this.y, this.m, this.today.getDate() + 1, 15,  0) },
      { Id: 4,  Subject: 'Client Demo',           StartTime: new Date(this.y, this.m, this.today.getDate() + 2, 11,  0), EndTime: new Date(this.y, this.m, this.today.getDate() + 2, 12, 30) },
      { Id: 5,  Subject: '1:1 with Manager',      StartTime: new Date(this.y, this.m, this.today.getDate() + 3, 15,  0), EndTime: new Date(this.y, this.m, this.today.getDate() + 3, 15, 30) },
      { Id: 6,  Subject: 'Architecture Workshop', StartTime: new Date(this.y, this.m, this.today.getDate() - 1,  9,  0), EndTime: new Date(this.y, this.m, this.today.getDate() - 1, 17,  0) },
      { Id: 7,  Subject: 'Code Review',           StartTime: new Date(this.y, this.m, this.today.getDate(),     16,  0), EndTime: new Date(this.y, this.m, this.today.getDate(),     17,  0) },
      { Id: 8,  Subject: 'Release Planning',      StartTime: new Date(this.y, this.m, this.today.getDate() + 4, 13,  0), EndTime: new Date(this.y, this.m, this.today.getDate() + 4, 14,  0) },
    ],
  };

  readonly monthConfig: ScheduleConfig = {
    currentView: 'Month',
    views: ['Month', 'Agenda'],
    selectedDate: this.today,
    showWeekend: false,
    firstDayOfWeek: 1,
    height: '520px',
    events: [
      { Id: 10, Subject: 'Q3 Planning',           StartTime: new Date(this.y, this.m, 3),  EndTime: new Date(this.y, this.m, 3),  IsAllDay: true },
      { Id: 11, Subject: 'Team Offsite',           StartTime: new Date(this.y, this.m, 7),  EndTime: new Date(this.y, this.m, 8),  IsAllDay: true },
      { Id: 12, Subject: 'Product Launch',         StartTime: new Date(this.y, this.m, 15), EndTime: new Date(this.y, this.m, 15), IsAllDay: true },
      { Id: 13, Subject: 'Board Meeting',          StartTime: new Date(this.y, this.m, 20, 10, 0), EndTime: new Date(this.y, this.m, 20, 12, 0) },
      { Id: 14, Subject: 'Sprint Retrospective',   StartTime: new Date(this.y, this.m, 22, 14, 0), EndTime: new Date(this.y, this.m, 22, 15, 0) },
      { Id: 15, Subject: 'Annual Review',          StartTime: new Date(this.y, this.m, 28), EndTime: new Date(this.y, this.m, 28), IsAllDay: true },
    ],
  };
}
