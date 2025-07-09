import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import PasswordGenerator from "../PasswordGenerator.vue";

describe("PasswordGenerator", () => {
  it("generates password on mount", () => {
    const wrapper = mount(PasswordGenerator);
    expect(wrapper.vm.password).toBeTruthy();
    expect(wrapper.vm.password.length).toBe(14); // default length
  });

  it("updates password length when slider changes", async () => {
    const wrapper = mount(PasswordGenerator);
    await wrapper.find('input[type="range"]').setValue(20);
    expect(wrapper.vm.password.length).toBe(20);
  });

  it("generates password with only lowercase when other options are disabled", async () => {
    const wrapper = mount(PasswordGenerator);

    // Disable all options except lowercase
    await wrapper.find('[data-testid="uppercase-checkbox"]').setValue(false);
    await wrapper.find('[data-testid="numbers-checkbox"]').setValue(false);
    await wrapper.find('[data-testid="symbols-checkbox"]').setValue(false);

    // Optionally, ensure lowercase is enabled
    await wrapper.find('[data-testid="lowercase-checkbox"]').setValue(true);

    // Wait for DOM/reactivity
    await nextTick();

    const password = wrapper.vm.password;
    expect(password).toMatch(/^[a-z]+$/);
  });

  it("copies password to clipboard when copy button is clicked", async () => {
    const wrapper = mount(PasswordGenerator);

    // Wait for DOM/reactivity to ensure password is generated and button is rendered
    await nextTick();

    const mockClipboard = vi.fn();
    const originalClipboard = navigator.clipboard.writeText;

    navigator.clipboard.writeText = mockClipboard;

    // Now the button should exist
    const copyBtn = wrapper.find('[data-testid="copy-btn"]');
    expect(copyBtn.exists()).toBe(true);

    await copyBtn.trigger("click");

    expect(mockClipboard).toHaveBeenCalledWith(wrapper.vm.password);

    // Restore original clipboard function
    navigator.clipboard.writeText = originalClipboard;
  });

  it("updates button icon when password is copied", async () => {
    const wrapper = mount(PasswordGenerator);

    // Wait for DOM/reactivity to ensure password is generated and button is rendered
    await nextTick();

    // Mock clipboard
    const mockClipboard = vi.fn();
    const originalClipboard = navigator.clipboard.writeText;
    navigator.clipboard.writeText = mockClipboard;

    // Click the copy button
    await wrapper.find('[data-testid="copy-btn"]').trigger("click");
    await nextTick();

    expect(wrapper.vm.copyIcon.iconName).toBe("check");

    // Wait for the icon to reset
    await new Promise((resolve) => setTimeout(resolve, 2100));
    expect(wrapper.vm.copyIcon.iconName).toBe("copy");

    // Restore clipboard
    navigator.clipboard.writeText = originalClipboard;
  });

  it('logs error when copy to clipboard fails', async () => {
    const wrapper = mount(PasswordGenerator)

    // Wait for DOM/reactivity to ensure password is generated and button is rendered
    await nextTick()

    // Mock clipboard to throw error
    const originalClipboard = navigator.clipboard.writeText
    navigator.clipboard.writeText = vi.fn().mockRejectedValue(new Error('fail'))

    // Spy on console.error
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Click the copy button
    const copyBtn = wrapper.find('[data-testid="copy-btn"]')
    await copyBtn.trigger('click')

    expect(errorSpy).toHaveBeenCalledWith(
      "Failed to copy password:",
      expect.any(Error)
    )

    // Restore mocks
    navigator.clipboard.writeText = originalClipboard
    errorSpy.mockRestore()
  })
});
