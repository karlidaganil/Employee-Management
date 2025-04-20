import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/header.js';
import '../src/components/table.js';
import '../src/components/modal.js';
import '../src/components/create-update.js';
import '../src/components/list.js';

describe('Component Visibility Tests', () => {
  describe('Header Component', () => {
    it('should render in the DOM', async () => {
      const element = await fixture(html`<header-component></header-component>`);
      
      // Check if component exists
      expect(element).to.exist;
      
      // Check if main elements are rendered
      const header = element.shadowRoot.querySelector('header');
      expect(header).to.exist;
      
      // Check if logo is rendered
      const logo = header.querySelector('img[alt="logo"]');
      expect(logo).to.exist;
    });
  });

  describe('Table Component', () => {
    it('should render in the DOM', async () => {
      const mockData = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '05383976177',
          department: 'Tech',
          position: 'Senior',
          dateOfEmployment: '2024-01-01'
        }
      ];
      
      const element = await fixture(html`
        <table-component 
          .data=${mockData}
          .itemsPerPage=${10}
        ></table-component>
      `);
      
      // Check if component exists
      expect(element).to.exist;
      
      // Check if table is rendered
      const table = element.shadowRoot.querySelector('table');
      expect(table).to.exist;
      
      // Check if pagination exists
      const pagination = element.shadowRoot.querySelector('.pagination');
      expect(pagination).to.exist;
    });
  });

  describe('Modal Component', () => {
    it('should render in the DOM when show is true', async () => {
      const element = await fixture(html`
        <confirmation-modal
          .show=${true}
          .title=${'Test Modal'}
          .message=${'Test Message'}
        ></confirmation-modal>
      `);
      
      // Check if component exists
      expect(element).to.exist;
      
      // Check if modal elements are rendered
      const overlay = element.shadowRoot.querySelector('.modal-overlay');
      expect(overlay).to.exist;
      
      const content = element.shadowRoot.querySelector('.modal-content');
      expect(content).to.exist;
    });

    it('should not render content when show is false', async () => {
      const element = await fixture(html`
        <confirmation-modal
          .show=${false}
          .title=${'Test Modal'}
          .message=${'Test Message'}
        ></confirmation-modal>
      `);
      
      const overlay = element.shadowRoot.querySelector('.modal-overlay');
      expect(overlay).to.not.exist;
    });
  });

  describe('Create/Update Component', () => {
    it('should render in the DOM', async () => {
      const element = await fixture(html`
        <create-update-component></create-update-component>
      `);
      
      // Check if component exists
      expect(element).to.exist;
      
      // Check if form is rendered
      const form = element.shadowRoot.querySelector('form');
      expect(form).to.exist;
      
      // Check if input fields are rendered
      const inputs = form.querySelectorAll('input');
      expect(inputs.length).to.be.greaterThan(0);
      
      // Check if submit button exists
      const submitButton = form.querySelector('.submit-button');
      expect(submitButton).to.exist;
    });
  });

  describe('List Component', () => {
    it('should render in the DOM', async () => {
      const mockData = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          department: 'Tech',
          position: 'Senior'
        }
      ];
      
      const element = await fixture(html`
        <list-component .data=${mockData}></list-component>
      `);
      
      // Check if component exists
      expect(element).to.exist;
      
      // Check if container is rendered
      const container = element.shadowRoot.querySelector('.container');
      expect(container).to.exist;
      
      // Check if card grid is rendered
      const cardGrid = element.shadowRoot.querySelector('.card-grid');
      expect(cardGrid).to.exist;
      
      // Check if employee card is rendered
      const employeeCard = element.shadowRoot.querySelector('.employee-card');
      expect(employeeCard).to.exist;
    });

    it('should render empty state correctly', async () => {
      const element = await fixture(html`
        <list-component .data=${[]}></list-component>
      `);
      
      // Check if component exists with empty data
      expect(element).to.exist;
      
      // Check if container exists even when empty
      const container = element.shadowRoot.querySelector('.container');
      expect(container).to.exist;
      
      // Check that no cards are rendered
      const employeeCards = element.shadowRoot.querySelectorAll('.employee-card');
      expect(employeeCards.length).to.equal(0);
    });
  });
}); 