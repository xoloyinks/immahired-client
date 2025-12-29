import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    userName: string;
    userEmail: string;
    userType: string;
    isLoading: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    userName,
    userEmail,
    userType,
    isLoading
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <FaExclamationTriangle className="text-red-500 text-xl" />
                        <h3 className="text-lg font-semibold text-gray-900">
                            Confirm Deletion
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={isLoading}
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Content */}
                <div className="mb-6">
                    <p className="text-gray-700 mb-4">
                        Are you sure you want to delete this user? This action cannot be undone.
                    </p>

                    <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                        <h4 className="font-medium text-red-800 mb-2">User Details:</h4>
                        <p className="text-sm text-red-700">
                            <span className="font-medium">Name:</span> {userName || 'N/A'}
                        </p>
                        <p className="text-sm text-red-700">
                            <span className="font-medium">Email:</span> {userEmail}
                        </p>
                        <p className="text-sm text-red-700">
                            <span className="font-medium">Type:</span> {userType}
                        </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                        <h4 className="font-medium text-yellow-800 mb-2">
                            The following data will be permanently deleted:
                        </h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• User profile and account</li>
                            <li>• All uploaded documents (resume, certificates, images)</li>
                            <li>• Chat history and messages</li>
                            <li>• Notifications and subscriptions</li>
                            <li>• Package information</li>
                            {userType === 'talent' && (
                                <li>• Talent profile and saved jobs</li>
                            )}
                            {userType === 'employer' && (
                                <li>• Employer profile and saved talents</li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            'Delete User'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;