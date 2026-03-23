import { BsCheckLg, BsChevronDown } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { ISetting } from "./Workflows/Playground";
import useLocalStorage from "../hooks/useLocalStorage";

import { createPortal } from "react-dom";

const EDITOR_FONT_SIZES = ["12px", "13px", "14px", "15px", "16px", "17px", "18px"];

interface SettingsModalProps {
	settings: ISetting;
	setSettings: React.Dispatch<React.SetStateAction<ISetting>>;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ setSettings, settings }) => {
	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

	const handleClickDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		setSettings({ ...settings, dropdownIsOpen: !settings.dropdownIsOpen });
	};

    if (typeof window === "undefined") return null;

	return createPortal(
		<div className='text-white z-50'>
			<div aria-modal='true' role='dialog' className='fixed inset-0 overflow-y-auto z-50'>
				<div className='flex min-h-screen items-center justify-center px-4'>
					<div
						className='fixed inset-0'
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
						onClick={() => setSettings({ ...settings, setSettingModalOpen: false })}
					></div>

					<div className='relative my-8 inline-block transform text-left transition-all shadow-2xl p-0 bg-dark-layer-1 !overflow-visible opacity-100 scale-100' style={{ width: "540px", maxWidth: "100%", borderRadius: "20px" }}>
						{/* setting header */}
						<div className='flex items-center border-b px-6 py-8 text-xl font-semibold text-white border-dark-divider-border-2'>
							Settings
							<button
								className='ml-auto cursor-pointer rounded transition-all hover:bg-dark-fill-3 p-1'
								onClick={() => setSettings({ ...settings, setSettingModalOpen: false })}
							>
								<IoClose className='text-2xl text-gray-400 hover:text-white transition-colors' />
							</button>
						</div>

						<div className='px-6 py-10 pt-8 pb-10'>
							<div className='mt-6 flex justify-between items-center first:mt-0'>
								<div className='flex-1 pr-4'>
									<h3 className='text-lg font-medium text-white'>Font size</h3>
									<h3 className='text-base text-gray-400 mt-2'>
										Choose your preferred font size for the code editor.
									</h3>
								</div>
								<div className='w-36 relative'>
									<button
										onClick={handleClickDropdown}
										className='flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-left focus:outline-none whitespace-nowrap bg-dark-fill-3 hover:bg-dark-fill-2 active:bg-dark-fill-3 w-full text-base font-medium text-gray-200 hover:text-white transition-colors'
										type='button'
									>
										{fontSize}
										<BsChevronDown className="ml-2 text-gray-400" />
									</button>
										{/* Show dropdown for fontsizes */}
										{settings.dropdownIsOpen && (
											<ul
												className='absolute mt-1 max-h-56 overflow-auto flex flex-col gap-1 rounded-lg p-2 z-50 focus:outline-none shadow-lg w-full bg-dark-layer-1 border border-dark-divider-border-2'
												style={{
													filter: "drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px) drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px)",
												}}
											>
												{EDITOR_FONT_SIZES.map((fontSize, idx) => (
													<SettingsListItem
														key={idx}
														fontSize={fontSize}
														selectedOption={settings.fontSize}
														handleFontSizeChange={(fontSize) => {
															setFontSize(fontSize);
															setSettings({ ...settings, fontSize: fontSize, dropdownIsOpen: false });
														}}
													/>
												))}
											</ul>
										)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>,
        document.body
	);
};
export default SettingsModal;

interface SettingsListItemProps {
	fontSize: string;
	selectedOption: string;
	handleFontSizeChange: (fontSize: string) => void;
}

const SettingsListItem: React.FC<SettingsListItemProps> = ({ fontSize, selectedOption, handleFontSizeChange }) => {
	return (
		<li 
            className='relative flex h-10 py-1 cursor-pointer select-none items-center justify-between rounded-lg px-3 text-gray-300 hover:bg-dark-fill-3 hover:text-white transition-colors duration-200'
            onClick={() => handleFontSizeChange(fontSize)}
        >
			<div className={`flex items-center ${selectedOption === fontSize ? "text-white font-medium" : ""}`}>
				<span className='whitespace-nowrap'>{fontSize}</span>
			</div>
            {selectedOption === fontSize && (
                <span className='text-blue-500 flex items-center'>
                    <BsCheckLg />
                </span>
            )}
		</li>
	);
};
