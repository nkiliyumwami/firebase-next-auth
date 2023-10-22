function MessageButton({ userId }) {
  const sendMessage = () => {
    // Logic to send a message to the user
    alert(`Sending a message to user with ID: ${userId}`);
  };

  return (
    <button
      onClick={sendMessage}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Send Message
    </button>
  );
}

export default MessageButton;
